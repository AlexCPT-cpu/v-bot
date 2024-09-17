import React from "react";
import { useState } from "react";

const Switch = ({
  checked,
  className,
  onChange,
  noMargin,
}: {
  checked: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
  noMargin?: boolean;
}) => {
  const [checkedState, setChecked] = useState(checked);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    setChecked(isChecked);
    onChange(isChecked); // Notify the parent component of the change
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        noMargin ? "" : "mb-5"
      }`}
    >
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checkedState}
        onChange={handleToggle}
      />
      <div
        className={`relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black dark:peer-focus:ring-black rounded-full peer dark:bg-black/50 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-white ${className}`}
      ></div>
    </label>
  );
};

export default Switch;
