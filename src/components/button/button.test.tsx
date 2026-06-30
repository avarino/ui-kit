import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders as button element", () => {
    render(<Button>Submit</Button>);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("passes disabled prop", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies default classes", () => {
    render(<Button>Styled</Button>);

    const btn = screen.getByRole("button");

    expect(btn).toHaveClass("bg-blue-600");
    expect(btn).toHaveClass("rounded-md");
  });
});
