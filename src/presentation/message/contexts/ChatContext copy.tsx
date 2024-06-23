import { Message, newSocketMessageDto } from "@/domain";
import { SocketIOAdapter } from "@/infrastructure/adapters/socketIO.adapter";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { set } from "react-hook-form";
import { Socket, io } from "socket.io-client";

// interface ChatContextInterface {
//   socket: Socket | undefined;
//   chatRoomId: string | undefined;
// }

interface ChatContextInterface {
  handleChangeChatRoom: (chatRoomId: string) => void;
  sendMessage: (message: Message) => void;
}

const initialState: ChatContextInterface = {
  handleChangeChatRoom: () => {},
  sendMessage: () => {}
};

const ChatContext: React.Context<ChatContextInterface> = createContext(initialState);

const ChatContextProvider: React.FC<{ children: ReactNode; receiveMessageCallback: (message: Message) => void }> = ({
  children,
  receiveMessageCallback
}) => {
  const socket = useRef<SocketIOAdapter | undefined>(undefined);
  const [chatRoomId, setChatRoomId] = useState<string | undefined>(undefined);

  //TODO: Import from socket infrastructure
  const getSocket = useCallback(
    function handleGetSocket(): Socket {
      if (!socket) {
        const newSocket = io("http://localhost:3000", { withCredentials: true });
        setSocket(newSocket);
      }
      return socket!;
    },
    [socket]
  );

  function socketDisconnect(): void {
    if (socket) socket.disconnect();
  }

  function socketJoinRoom(newChatRoomId: string) {
    socket?.emit("join", newChatRoomId);
  }

  function socketLeaveRoomIfAny() {
    if (chatRoomId) socket?.emit("leave", chatRoomId);
  }

  function handleChangeChatRoom(newChatRoomId: string): void {
    if (newChatRoomId && newChatRoomId != chatRoomId) {
      socketLeaveRoomIfAny();
      setChatRoomId(newChatRoomId);
    }
  }

  const sendMessage = useCallback(
    function handleSendMessage(message: Message): boolean {
      if (!message || !socket.current) return false;
      socket.current.sendMessage(message);
      return true;
    },
    [socket]
  );

  useEffect(() => {
    if (chatRoomId) {
      const socketInstance = SocketIOAdapter.getInstance();
      if (!socketInstance) throw new Error("Cannot connect to socket");
      socket.current = socketInstance;

      socket.current.joinRoom(chatRoomId);
      return () => {
        socket.current?.leaveRoom(chatRoomId);
      };
    }
  }, [chatRoomId, socket]);

  useEffect(() => {
    if (receiveMessageCallback) {
      const receiveMessage = (server_message: any) => {
        const [error, message] = newSocketMessageDto.createMessage(server_message);
        console.log("DTO", message, error);
        if (error) throw new Error(error);
        receiveMessageCallback(message!);
      };

      const currentSocket = getSocket();
      currentSocket.on("message", receiveMessage);

      return () => {
        if (socket) socket.off("message", receiveMessage);
      };
    }
  }, [socket, receiveMessageCallback]);

  const values = useMemo(
    () => ({
      handleChangeChatRoom,
      sendMessage
    }),
    [socket]
  );

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) console.error("Error deploying App Context!!!");

  return context;
}

export { ChatContext, ChatContextProvider, useChatContext };
