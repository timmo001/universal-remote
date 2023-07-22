"use client";
export default function InputLabel({
  label,
  icon,
}: {
  label?: string;
  icon?: JSX.Element;
}) {
  return (
    <span className="flex flex-row items-center gap-2">
      {icon}
      <span className="block text-sm font-medium text-gray-200">{label}</span>
    </span>
  );
}
