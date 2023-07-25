"use client";
import { ChangeEvent, ChangeEventHandler } from "react";

import InputLabel from "@/components/inputLabel";

export default function InputSelect({
  name,
  label,
  icon,
  options,
  value,
  handleChange,
}: {
  name: string;
  label?: string;
  icon?: JSX.Element;
  options: Array<string | [string, string]>;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  function handleEntityChange(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;

    // Prevent empty values
    if (target.value === "") return;

    // Prevent non-existent values
    if (
      !options.find((item: string | [string, string]) =>
        typeof item === "string"
          ? item === target.value
          : item[0] === target.value,
      )
    )
      return;

    handleChange({
      target: {
        name,
        value: target.value,
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
          onChange={handleEntityChange}
          list={`${name}-options`}
          defaultValue={value}
        />
        <datalist id={`${name}-options`}>
          {options.map((item: string | [string, string]) =>
            typeof item === "string" ? (
              <option key={item} label={item} value={item} />
            ) : (
              <option key={item[0]} label={item[1]} value={item[0]} />
            ),
          )}
        </datalist>
      </div>
    </label>
  );
}
