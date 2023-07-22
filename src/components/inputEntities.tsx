"use client";
import type { HassEntity } from "home-assistant-js-websocket";
import { ChangeEventHandler, useMemo } from "react";

import { useHomeAssistant } from "@/providers/homeAssistant";
import InputLabel from "@/components/inputLabel";

export default function InputEntities({
  name,
  label,
  icon,
  filters,
  value,
  handleChange,
}: {
  name: string;
  label?: string;
  icon?: JSX.Element;
  filters?: Array<string>;
  value: Array<string>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const homeAssistant = useHomeAssistant();

  const options = useMemo<Array<string>>(() => {
    if (!homeAssistant.entities) {
      console.log("No Home Assistant entities.");
      return [];
    }
    return Object.values(homeAssistant.entities)
      .filter(
        (entity: HassEntity) => !filters || filters.includes(entity.entity_id),
      )
      .map((entity: HassEntity) => entity.entity_id)
      .sort();
  }, [filters, homeAssistant.entities]);

  return (
    <label className="block w-full">
      <InputLabel label={label} icon={icon} />
      <div className="relative">
        <input
          className="form-multiselect mt-1 block w-full rounded-md border-gray-900 bg-gray-900 px-2 py-1 text-gray-200 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
          type="text"
          name={name}
          onChange={handleChange}
          value={value.join(",")}
          list={`${name}-options`}
        />
        <datalist id={`${name}-options`}>
          {options.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>
    </label>
  );
}
