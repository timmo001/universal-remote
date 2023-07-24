"use client";
import { usePathname, useRouter } from "next/navigation";
import { mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";

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
          <Icon title="Switches" size={1} path={mdiChevronLeft} />
        </button>
      )}
      <h2 className="text-2xl font-bold">{pageMap[pathname]}</h2>
    </header>
  );
}
