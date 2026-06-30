import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,

  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },

    loading: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    fullWidth: {
      control: "boolean",
    },

    onClick: {
      action: "clicked",
    },
  },

  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button");

    await expect(button).toBeDisabled();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },

  parameters: {
    layout: "padded",
  },
};

export const LeftIcon: Story = {
  args: {
    leftIcon: <Plus size={16} />,
    children: "Create",
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: <ArrowRight size={16} />,
    children: "Continue",
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <Plus size={18} />,
  },
};
