"use client";
import type { HassEntity } from "home-assistant-js-websocket";
import { ChangeEventHandler, KeyboardEvent, useMemo } from "react";

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

  const entities = useMemo<Array<HassEntity>>(() => {
    if (!homeAssistant.entities) {
      console.log("No Home Assistant entities.");
      return [];
    }
    return Object.values(homeAssistant.entities).filter((entity: HassEntity) =>
      filters ? filters.includes(entity.entity_id.split(".")[0]) : true,
    );
  }, [filters, homeAssistant.entities]);

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>): void {
    // Only handle Enter key
    if (event.key !== "Enter") return;

    // Prevent form submission
    event.preventDefault();

    const target = event.target as HTMLInputElement;

    // Prevent empty values
    if (target.value === "") return;

    // Prevent duplicate values
    if (value.includes(target.value)) return;

    // Prevent non-existent values
    if (
      !entities.find((entity: HassEntity) => entity.entity_id === target.value)
    )
      return;

    handleChange({
      target: {
        name,
        value: [...value, target.value],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
    target.value = "";
  }

  function handleRemoveItem(item: string): void {
    handleChange({
      target: {
        name,
        value: value.filter((option) => option !== item),
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <label className="block w-full">
      <InputLabel label={label} icon={icon} />
      <div className="relative">
        <input
          className="form-multiselect mt-1 block w-full rounded-md border-gray-900 bg-gray-900 px-2 py-1 text-gray-200 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
          type="text"
          name={name}
          onKeyDown={handleKeyPress}
          list={`${name}-options`}
        />
        <datalist id={`${name}-options`}>
          {entities.map((entity: HassEntity) => (
            <option
              key={entity.entity_id}
              label={
                entity.attributes?.friendly_name
                  ? `${entity.attributes.friendly_name} - ${entity.entity_id}`
                  : entity.entity_id
              }
              value={entity.entity_id}
            />
          ))}
        </datalist>
      </div>
      <div className="mt-2 flex w-full flex-wrap gap-2">
        {value.map((option: string) => (
          <div
            key={option}
            className="flex items-center rounded-full bg-gray-700 py-1 pl-3 pr-2 text-gray-100"
          >
            <span>{option}</span>
            <button
              className="ml-2 text-gray-300 hover:text-gray-100"
              onClick={() => handleRemoveItem(option)}
            >
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm4.293 11.707a1 1 0 11-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 11-1.414-1.414L8.586 10l-2.879-2.879a1 1 0 111.414-1.414L10 8.586l2.879-2.879a1 1 0 111.414 1.414L11.414 10l2.879 2.879z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </label>
  );
}
