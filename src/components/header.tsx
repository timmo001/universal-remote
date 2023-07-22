"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

export const pageMap: { [path: string]: string } = {
  "/": "Home",
  "/lights": "Lights",
  "/music": "Music",
  "/settings": "Settings",
  "/setup": "Setup",
  "/tv": "TV",
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="align-center flex w-full flex-row justify-start gap-2">
      {pathname !== "/" && (
        <button
          className="rounded-md border border-transparent text-sm font-medium text-white shadow-sm focus:outline-none"
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-400" />
        </button>
      )}
      <h2 className="text-2xl font-bold">{pageMap[pathname]}</h2>
    </header>
  );
}
