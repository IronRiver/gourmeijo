import { Gourmet } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Gourmet,
  tags: ["autodocs"],
} satisfies Meta<typeof Gourmet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
