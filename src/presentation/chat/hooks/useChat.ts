import { Message } from "@/domain";
import { SocketIOAdapter } from "@/infrastructure";
import { useEffect, useRef, useState } from "react";

export function useChat(){
    const socket = useRef<SocketIOAdapter | undefined>(undefined);
    const [currentChatId, setCurrentChatId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!socket.current) socket.current = SocketIOAdapter.getInstance();
        if (currentChatId) {
            console.log("USECHAT", currentChatId)
          socket.current.joinRoom(currentChatId);
        }
    
        return () => {
          if (currentChatId) {
            console.log("USECHAT RETURN", currentChatId)
            socket.current?.leaveRoom(currentChatId);
            // socket.current?.closeSocket();
            // socket.current = undefined
          }
        };
      }, [currentChatId]);

      function handleOnMessage(callback:(message:Message)=> void): void {
        if(!socket) throw new Error("Socket error")
        socket.current?.onMessage(callback)
      }

      function handleSendMessage(message:Message):void {
        if(!socket) throw new Error("Socket error")
        socket.current?.sendMessage(message)
      }

      function handleChangeChat(chatId:string):void {
        if(!socket) throw new Error("Socket error")
        if(currentChatId) socket.current?.leaveRoom(currentChatId)
        setCurrentChatId(chatId)
      }

    return {handleSendMessage, handleOnMessage, handleChangeChat}
}