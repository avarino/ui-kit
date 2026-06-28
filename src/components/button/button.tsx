import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const a: string = 10;
console.log(a);
export type Variants = {
  filled: string;
};

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
