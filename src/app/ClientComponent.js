"use client";

import { useAuthContext } from "@/presentation/user/context/AuthContext";

export default function ClientComponent() {
  const { access_token } = useAuthContext();

  return <p>Access: {access_token}</p>;
}
