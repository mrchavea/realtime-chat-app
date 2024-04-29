import Sidebar from "./Sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const data = [{ value: "PRIMERO" }, { value: "SEGUNDO" }];
  console.log("SERVER SIDE DATA", data);
  return (
    <div className="flex w-full h-full">
      <Sidebar chats={data} />
      <section className="w-full bg-orange-700">{children}</section>
    </div>
  );
}
