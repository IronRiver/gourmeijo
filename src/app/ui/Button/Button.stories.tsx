import { Button } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
