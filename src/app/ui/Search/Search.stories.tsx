import { Search } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Search,
  tags: ["autodocs"],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
