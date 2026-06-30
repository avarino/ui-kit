import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../src",
      files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
    },
  ],
  addons: [
    // "@chromatic-com/storybook", // Hadi: Visual Test for component snap shot
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return config;
  },
};
export default config;
