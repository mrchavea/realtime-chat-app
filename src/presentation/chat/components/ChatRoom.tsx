"use client";

import { Button, User as UserAvatar } from "@nextui-org/react";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { FormEvent, memo, useEffect, useRef, useState } from "react";
import { Chat, Message, User } from "@/domain";
import { useAuthContext } from "../../user/contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

export default function ChatRoom({ ssr_chat }: { ssr_chat?: Chat }) {
  const { user: authenticatedUser } = useAuthContext();
  const { handleSendMessage, handleOnMessage, handleChangeChat } = useChat();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const $form = useRef<HTMLFormElement>(null);
  const $textArea = useRef<HTMLTextAreaElement>(null);
  const $textAreaContainer = useRef<HTMLDivElement>(null);
  const $scrollabeContent = useRef<HTMLDivElement>(null);
  //Use memo with message
  const Message = memo(({ message }: { message: Message }) => {
    console.log("mensaje:", message, new Date(message.sent_date));
    return (
      <li
        className={`gap-2 text-white w-fit rounded-md flex flex-row px-3 py-2 ${
          message.from == authenticatedUser?.id ? "self-end bg-indigo-500" : "self-start bg-gray-500"
        }`}
      >
        <span className="text-[15px]">{message.text}</span>
        <span className="pt-2 self-end text-[12px] text-gray-300">
          {new Date(message.sent_date).getHours() + ":" + new Date(message.sent_date).getHours()}
        </span>
      </li>
    );
  });

  // function newMessageCallback(message: Message): void {
  //   console.log("Callback?", message);
  //   if (!message) return;
  //   handleAddMessage(message);
  // }
  function handleSetInitialMessages(): void {
    if (ssr_chat) setMessages(ssr_chat.messages);
  }

  useEffect(() => {
    console.log("RENDERING CHAT ROOM");
    handleSetInitialMessages();
    handleChangeChat(ssr_chat?.id!);
    handleOnMessage((message: Message) => {
      console.log("message?", message);
      setMessages((prev) => [...prev, message]);
    });
    const textAreaContainer = $textAreaContainer.current;
    const textarea = $textArea.current;

    if (textAreaContainer) textAreaContainer.addEventListener("click", handleTextAreaFocus);
    if (textarea) textarea.addEventListener("keydown", handlePressEnter);
    $scrollabeContent.current!.scrollTop = 0;

    return () => {
      if (textAreaContainer) textAreaContainer.removeEventListener("click", handleTextAreaFocus);
      if (textarea) textarea.removeEventListener("keydown", handlePressEnter);
    };
  }, []);

  useEffect(() => {
    if ($scrollabeContent.current) $scrollabeContent.current!.scrollTop = $scrollabeContent.current!.scrollHeight;
  }, [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!message) return;
    const newMessage: Message = {
      id: Math.random().toString(),
      from: authenticatedUser?.id!,
      to: ssr_chat?.users[1].id!,
      sent_date: new Date(),
      text: message,
      chatId: ssr_chat?.id!
    };
    handleSendMessage(newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    // const ok = sendMessage(newMessage);
    // if (!ok) throw new Error("Error sending message");
    // handleAddMessage(newMessage);
  };

  const handlePressEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      $form.current?.dispatchEvent(submitEvent);
    }
  };

  const handleTextAreaFocus = () => {
    if ($textArea.current) $textArea.current.focus();
  };

  return (
    <>
      <div className="relative flex flex-col flex-nowrap w-full min-h-screen h-full">
        <nav className="sticky top-0  flex w-full justify-between items-center min-h-[70px] border-b-1 border-gray-800 border-opacity-30 bg-gray-700">
          {/* <nav className="max-w-[1000px] m-auto bg-slate-100 w-7 h-7 rounded-full ml-5"></nav> */}
          <UserAvatar
            name="Jane Doe"
            description={
              <div className="inline-flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-green-600 content-none"></span>
                <p className="text-gray-200">En linea</p>
              </div>
            }
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            }}
            classNames={{ name: "font-extrabold" }}
            className="pl-10"
          />
          <div className="pr-10">
            <Button className="bg-neutral-900 " variant="solid" radius="sm">
              Iniciar reunión
            </Button>
          </div>
        </nav>
        <main
          ref={$scrollabeContent}
          className="flex justify-center h-[calc(100vh-110px-70px-15px)] w-full px-10 pt-6 overflow-y-auto scroll-smooth"
        >
          <ul className="text-xl flex flex-col gap-4 w-full md:max-w-2xl">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <br></br>
          </ul>
        </main>
        <footer className="bg-gray-700 px-10 w-full h-[110px]">
          <form
            id="chatForm"
            ref={$form}
            className="justify-center items-center w-full inline-flex gap-4"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="flex items-center">
              <Button isIconOnly radius="full" className="bg-transparent hover:bg-zinc-800 hover:text-indigo-500">
                <PaperClipIcon className="h-5 w-5" />
              </Button>
            </div>
            <div
              ref={$textAreaContainer}
              className="max-w-[750px] w-full cursor-text relative bg-zinc-800 px-4 py-3 text-sm font-normal bg-clip-padding rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
            >
              <textarea
                ref={$textArea}
                value={message}
                autoComplete="off"
                onChange={(message) => setMessage(message.target.value)}
                placeholder="Escribe un mensaje..."
                rows={2}
                className="h-[20px] max-h-[20vh] overflow-y-hidden overflow-x-auto resize-none focus:outline-none border-none w-[85%] bg-transparent"
              />
              <button type="submit" className="absolute right-0 top-3 flex items-center px-4">
                <PaperAirplaneIcon className="h-5 w-5 -rotate-45 text-indigo-500" />
              </button>
            </div>
            {/* <input type="submit" hidden /> */}
          </form>
        </footer>
      </div>
    </>
  );
}
