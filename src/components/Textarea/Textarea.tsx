import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  [
    "flex",
    "min-h-24",
    "rounded-md",
    "border",
    "bg-background",
    "px-3",
    "py-2",
    "text-sm",
    "transition-colors",
    "outline-none",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
        ghost: "border-transparent bg-transparent",
      },

      size: {
        sm: "min-h-20 text-sm",
        md: "min-h-24 text-sm",
        lg: "min-h-32 text-base",
      },

      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },

      fullWidth: {
        true: "w-full",
        false: "",
      },

      invalid: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
      resize: "vertical",
      fullWidth: false,
      invalid: false,
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, resize, fullWidth, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          textareaVariants({
            variant,
            size,
            resize,
            fullWidth,
            invalid,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
