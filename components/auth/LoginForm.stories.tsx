import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: /continue with google/i });
    await userEvent.click(submitButton);
    const loadingIndicator = await canvas.findByRole('status');
    await expect(loadingIndicator).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: false, error: 'Login failed' };
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: /continue with google/i });
    await userEvent.click(submitButton);
    const errorMessage = await canvas.findByText(/login failed/i);
    await expect(errorMessage).toBeInTheDocument();
  },
};
