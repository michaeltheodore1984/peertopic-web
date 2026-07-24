import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // or any icon lib you use

export function PasswordInput({
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full px-4 py-2 pr-10 rounded-lg border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 placeholder:text-gray-400 text-black"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

