import { Chat, User } from "@/domain";
import ChatList from "@/presentation/chat/components/ChatList";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const person1: User = { id: "234", name: "Persona1", profile_picture: "picture" };
  const person2: User = { id: "2345", name: "Persona2", profile_picture: "https://i.pravatar.cc/150?u=a04258114e29026702d" };
  const person3: User = { id: "23456", name: "Persona3", profile_picture: "https://i.pravatar.cc/150?u=a04258a2462d826712d" };
  const chat1: Chat = { id: "123", name: "Persona2", users: [person1, person2], messages: [] };
  const chat2: Chat = { id: "1234", name: "Persona3", users: [person1, person3], messages: [] };
  const data: Array<Chat> = [chat1, chat2];
  console.log("SERVER SIDE DATA", data);
  return (
    <div className="flex w-full">
      <ChatList chats={data} />
      <section className="bg-gray-700 sm:pl-[270px] w-full">{children}</section>
    </div>
  );
}
