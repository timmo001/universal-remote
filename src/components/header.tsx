"use client";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";

interface PageMap {
  [path: string]: string;
}

export const pageMap: PageMap = {
  "/tv": "TV",
  "/media": "Media",
  "/lights": "Lights",
  "/switches": "Switches",
  "/settings": "Settings",
  "/setup": "Setup",
  "/": "Home",
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const title = useMemo<string>(() => {
    console.log("pathname:", pathname);
    let result: string | undefined = pageMap[pathname];
    if (result) return result;

    result = Object.entries(pageMap).find(([path, value]) =>
      pathname.startsWith(path),
    )?.[1];
    if (result) return result;

    return "";
  }, [pathname]);

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
      <h2 className="text-2xl font-bold">{title}</h2>
    </header>
  );
}
