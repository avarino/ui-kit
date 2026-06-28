import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ children }: TextAreaProps) {
  return <textarea className="bg-red-500">{children}</textarea>;
}
