import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type Variants = {
  filled: string;
  outline: string;
  ghost?: string;
  text: string;
};

const variants: Variants = {
  filled: "bg-blue-500",
  outline: "border-blue-300",
  text: "text-red-50",
};

console.log(variants);

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="px-5 py-3 cursor-pointer text-white bg-blue-600 rounded-lg"
    >
      {children}
    </button>
  );
}
