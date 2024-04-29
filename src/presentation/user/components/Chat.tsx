"use client";

import { Button, Input, User } from "@nextui-org/react";
import { FingerPrintIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { io } from "socket.io-client";
import { FormEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Socket } from "dgram";

type Message = {
  value: string;
  myself: boolean;
  sent_date: Date;
};

type User = {
  name: string;
  profile_picture: string;
};

export default function Chat({ SSR_messages = [], destinatary }: { SSR_messages: Array<Message>; destinatary: User }) {
  const socket = useMemo(() => io("localhost:3000", { withCredentials: true }), []);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(SSR_messages);
  //Use memo with message
  const Message = memo(({ data }: { data: Message }) => {
    console.log("mensaje:", data.value, data.myself, data.myself ? "self-end bg-blue-500" : "self-start");
    return (
      <li
        className={`gap-2 text-white w-fit rounded-md flex flex-row px-3 py-1 ${
          data.myself ? "self-end bg-blue-500" : "self-start bg-gray-500"
        }`}
      >
        <span className="text-[15px]">{data.value}</span>
        <span className="mt-2 self-end text-[12px] text-gray-300">{data.sent_date.getHours() + ":" + data.sent_date.getMinutes()}</span>
      </li>
    );
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    // socket.emit("message", "HELLO");

    socket.on("message", (msg) => {
      console.log("SERVER MSG?", msg);
      const newMessage: Message = { myself: false, sent_date: new Date(), value: msg };
      handleAddMessage(newMessage);
    });

    const textAreaContainer = textAreaContainerRef.current;
    const textarea = textAreaRef.current;

    if (textAreaContainer) textAreaContainer.addEventListener("click", handleTextAreaFocus);
    if (textarea) textarea.addEventListener("keydown", handlePressEnter);

    return () => {
      if (textAreaContainer) textAreaContainer.removeEventListener("click", handleTextAreaFocus);
      if (textarea) textarea.removeEventListener("keydown", handlePressEnter);
    };
  }, []);

  const handleAddMessage = (newMessage: Message) => {
    // const newMessage: Message = { myself: message.myself, sent_date: message.myself ? new Date() : , value: message };
    setMessages((oldMessages) => {
      const newMessages = [...oldMessages];
      newMessages.push(newMessage);
      return newMessages;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message) return null;
    const newMessage: Message = { myself: true, sent_date: new Date(), value: message };
    socket.emit("message", message);
    handleAddMessage(newMessage);
    setMessage("");
  };

  const handlePressEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      formRef.current?.dispatchEvent(submitEvent);
    }
  };

  const handleTextAreaFocus = () => {
    if (textAreaRef.current) textAreaRef.current.focus();
  };

  return (
    <>
      <div className="relative sm:pl-[270px] flex flex-col flex-nowrap w-full min-h-screen h-full bg-gray-700">
        <nav className=" sticky top-0 pl-5  flex w-full items-center min-h-[70px] border-b-1 border-gray-800 bg-gray-700">
          {/* <nav className="max-w-[1000px] m-auto bg-slate-100 w-7 h-7 rounded-full ml-5"></nav> */}
          <User
            name="Jane Doe"
            description={
              <div className="inline-flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-green-600 content-none"></span>
                <p>En linea</p>
              </div>
            }
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            }}
            classNames={{ name: "font-extrabold" }}
          />
        </nav>
        <main className="h-full w-full px-10 pt-10 mb-[20px]">
          <ul className="text-xl flex flex-col gap-4">
            {messages.map((message) => (
              <Message data={message} />
            ))}
          </ul>
        </main>
        <footer className="sticky bottom-5 flex justify-center items-center px-10 pb-5 w-full h-[110px]">
          <form id="chatForm" ref={formRef} className="max-w-[1000px] w-full" onSubmit={(event) => handleSubmit(event)}>
            {/* <Input
              placeholder="Escribe un mensaje..."
              autoComplete="off"
              fullWidth
              size="lg"
              radius="sm"
              value={message}
              onChange={(message) => setMessage(message.target.value)}
              endContent={<PaperAirplaneIcon className="h-5 w-5 -rotate-45" />}
            ></Input> */}
            <div>
              <div
                ref={textAreaContainerRef}
                className="cursor-text relative w-full bg-zinc-800 px-4 py-3 text-sm font-normal bg-clip-padding rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
              >
                <textarea
                  ref={textAreaRef}
                  value={message}
                  autoComplete="off"
                  onChange={(message) => setMessage(message.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="h-[20px] overflow-y-hidden overflow-x-auto resize-none focus:outline-none border-none w-[85%] bg-transparent"
                />
                <button type="submit" className="absolute right-0 top-3 flex items-center px-4">
                  <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
                </button>
              </div>
            </div>
            {/* <input type="submit" hidden /> */}
          </form>
        </footer>
      </div>
    </>
  );
}
