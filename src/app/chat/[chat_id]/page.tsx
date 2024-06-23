import { Chat, Message, User } from "@/domain";
import ChatRoom from "@/presentation/chat/components/ChatRoom";
import { notFound } from "next/navigation";

const simulation = (chatId: string): Promise<Chat> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const person1: User = { id: "66133bb516300c72a70bdcfd", name: "Persona1", profile_picture: "picture" };
      const person2: User = { id: "2345", name: "Persona2", profile_picture: "https://i.pravatar.cc/150?u=a04258114e29026702d" };
      const messages: Array<Message> = [
        { id: "1231321", chatId: chatId, from: person1.id, to: person2.id, sent_date: new Date(), text: "Mensaje 1" },
        { id: "12313212", chatId: chatId, from: person2.id, to: person1.id, sent_date: new Date(), text: "Mensaje 2" }
      ];
      const chat1: Chat = { id: chatId, name: "Persona2", users: [person1, person2], messages: messages };
      resolve(chat1);
    }, 1500);
  });

export default async function ChatPage({ params }: { params: { chat_id: string } }) {
  console.log(params.chat_id);
  const ssr_data: Chat = await simulation(params.chat_id);
  if (!ssr_data) return notFound();

  return (
    <>
      <ChatRoom ssr_chat={ssr_data} />
    </>
  );
}
