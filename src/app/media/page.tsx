"use client";
import { useEffect } from "react";

import { useSettings } from "@/providers/settings";
import { redirect } from "next/navigation";

export default function Media() {
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings?.media?.entities || settings.media.entities.length < 1) return;
    redirect(`/media/${settings.media.entities[0].entity}`);
  }, [settings?.media?.entities]);

  if (!settings?.media?.entities || settings.media.entities.length < 1)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No media defined</h2>
        <p>
          Please add an entity in <a href="/settings">settings</a>.
        </p>
      </>
    );

  return <></>;
}
