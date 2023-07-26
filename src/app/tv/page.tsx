"use client";
import { useEffect } from "react";

import { useSettings } from "@/providers/settings";
import { redirect } from "next/navigation";

export default function TV() {
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings?.tv?.entities || settings.tv.entities.length < 1) return;
    redirect(`/tv/${settings.tv.entities[0].entity}`);
  }, [settings?.tv?.entities]);

  if (!settings?.tv?.entities || settings.tv.entities.length < 1)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No TV defined</h2>
        <p>
          Please add an entity in <a href="/settings">settings</a>.
        </p>
      </>
    );

  return <></>;
}
