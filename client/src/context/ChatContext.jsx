import { createContext, useContext, useState } from "react";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleContactClick = (contactUsername) => {
    setContact(contactUsername);
  };

  return (
    <ChatContext.Provider
      value={{
        handleContactClick,
        contact,
        setContact,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return ctx;
};
