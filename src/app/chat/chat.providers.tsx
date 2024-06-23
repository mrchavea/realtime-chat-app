"use client";

import { ChatContextProvider } from "@/presentation/chat/contexts/ChatContext";
import { ReactNode } from "react";

export default function ChatProviders({ children }: { children: ReactNode }) {
  return <ChatContextProvider>{children}</ChatContextProvider>;
}
