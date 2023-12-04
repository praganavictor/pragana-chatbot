"use client";

import "./page.css";
import Chat from "@/components/chat";

export default function Home() {
  return (
    <div className="absolute bottom-0 right-0 md:bottom-4 md:right-4">
      <Chat />
    </div>
  );
}
