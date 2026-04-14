import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "./AuthContext";
import { useChat } from "./ChatContext";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const clientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const { contact, setMessages } = useChat();
  const { user } = useAuth();
  const contactRef = useRef(contact);
  const userRef = useRef(user?.username);

  useEffect(() => {
    contactRef.current = contact;
  }, [contact]);

  useEffect(() => {
    userRef.current = user?.username;
  }, [user?.username]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token || !user?.username) return undefined;

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`http://localhost:8080/api/v1/ws?token=${token}`),
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      setConnected(true);
      client.subscribe("/user/queue/private", (frame) => {
        const data = JSON.parse(frame.body);
        const peer = contactRef.current;
        const me = userRef.current;
        if (!peer || !me) return;
        const inThread =
          (data.sender === peer && data.receiver === me) ||
          (data.sender === me && data.receiver === peer);
        if (!inThread) return;
        setMessages((prev) => [...(prev ?? []), data]);
      });
    };

    client.onDisconnect = () => {
      setConnected(false);
    };

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [user?.username, setMessages]);

  const sendPrivateMessage = useCallback((payload) => {
    const client = clientRef.current;
    if (!client?.active) {
      console.warn("WebSocket not connected");
      return;
    }
    client.publish({
      destination: "/commix/chat/private",
      body: JSON.stringify(payload),
    });
  }, []);

  return (
    <WebSocketContext.Provider value={{ connected, sendPrivateMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return ctx;
};
