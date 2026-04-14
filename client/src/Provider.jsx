import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import { WebSocketProvider } from "./context/WebSocketContext";

export const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <AlertProvider>
        <ChatProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </ChatProvider>
      </AlertProvider>
    </AuthProvider>
  );
};
