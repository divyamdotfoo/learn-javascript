"use client";
import { LOCAL_STORAGE_KEY } from "@/lib/constants";
import { useRouter } from "next/navigation";

export function Reset() {
  const router = useRouter();
  const handler = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    router.refresh();
  };
  return (
    <button className=" underline w-full text-end" onClick={handler}>
      reset
    </button>
  );
}
