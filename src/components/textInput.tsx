"use client";
import { ChangeEventHandler } from "react";

export default function TextInput({
  name,
  label,
  icon,
  value,
  handleChange,
}: {
  name: string;
  label?: string;
  icon?: JSX.Element;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block w-full">
      <span className="flex flex-row items-center gap-2">
        {icon}
        <span className="block text-sm font-medium text-gray-200">{label}</span>
      </span>
      <input
        className="mt-1 block w-full rounded-md border-gray-900 bg-gray-900 px-2 py-1 text-gray-200 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
        type="text"
        name={name}
        onChange={handleChange}
        value={value}
      />
    </label>
  );
}
