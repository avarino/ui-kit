import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonVariants = "filled" | "outline" | "ghost";
const test: ButtonVariants = "filled";
console.log(test);

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
