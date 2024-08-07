import ChatLayout from "@/presentation/shared/components/ChatLayout";
import ChatProviders from "./chat.providers";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProviders>
      <ChatLayout>{children}</ChatLayout>
    </ChatProviders>
  );
}
