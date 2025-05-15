"use client";
import {} from "next/navigation";

export default function Home() {
  const host = window.location.hostname;

  return <div className="flex flex-1r">{JSON.stringify(host, null, 2)}</div>;
}
