"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const routes = [
    // {
    //   label: "Home",
    //   href: "/",
    // },
    {
      label: "WEBRTC",
      href: "/webrtc",
    },
  ];
  return (
    <div>
      {routes.map((val) => (
        <button
          className="bg-gray-400 text-gray-800 border rounded p-4"
          onClick={() => {
            router.push(val.href);
          }}
        >
          {val.label}
        </button>
      ))}
    </div>
  );
}
