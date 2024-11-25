import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from './MainLayout';
import { SessionProvider } from 'next-auth/react';

const meta = {
  title: 'Layout/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SessionProvider>
        <Story />
      </SessionProvider>
    ),
  ],
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    children: <div className="text-center">Welcome to Coffee Log</div>,
  },
};

export const LoggedIn: Story = {
  parameters: {
    nextauth: {
      session: {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
    },
  },
  args: {
    children: <div className="text-center">Dashboard Content</div>,
  },
};
