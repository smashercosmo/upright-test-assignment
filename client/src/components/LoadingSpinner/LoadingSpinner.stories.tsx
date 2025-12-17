import type { Meta, StoryObj } from "@storybook/react-vite";

import { LoadingSpinner } from "./LoadingSpinner";

const meta = {
  title: "LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div style={{ inlineSize: 300 }}>
        <LoadingSpinner />
      </div>
    );
  },
};
