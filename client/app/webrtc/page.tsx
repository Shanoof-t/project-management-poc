"use client";
import { useRouter, usePathname } from "next/navigation";
import { v4 } from "uuid";
const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleRoom = () => {
    router.push(`${pathname}/${v4()}`);
  };

  return (
    <div>
      <button onClick={handleRoom}>create room</button>
    </div>
  );
};

export default page;
