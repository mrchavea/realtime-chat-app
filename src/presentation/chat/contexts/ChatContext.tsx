import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Message } from "@/domain";
import { SocketIOAdapter } from "@/infrastructure";

interface ChatContextProps {
  handleSendMessage: (message: Message) => void;
  handleOnMessage: (callback: (message: Message) => void) => void;
  handleChangeChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useRef<SocketIOAdapter | undefined>(undefined);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!socket.current) socket.current = SocketIOAdapter.getInstance();
    if (currentChatId) {
      console.log("USECHAT", currentChatId);
      socket.current.joinRoom(currentChatId);
    }

    return () => {
      if (currentChatId) {
        console.log("USECHAT RETURN", currentChatId);
        socket.current?.leaveRoom(currentChatId);
        socket.current?.closeSocket();
      }
    };
  }, [currentChatId]);

  function handleOnMessage(callback: (message: Message) => void): void {
    if (!socket) throw new Error("Socket error");
    socket.current?.onMessage(callback);
  }

  function handleSendMessage(message: Message): void {
    if (!socket) throw new Error("Socket error");
    socket.current?.sendMessage(message);
  }

  function handleChangeChat(chatId: string): void {
    if (!socket) throw new Error("Socket error");
    if (currentChatId) socket.current?.leaveRoom(currentChatId);
    setCurrentChatId(chatId);
  }

  return <ChatContext.Provider value={{ handleSendMessage, handleOnMessage, handleChangeChat }}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatContextProvider");
  }
  return context;
};
