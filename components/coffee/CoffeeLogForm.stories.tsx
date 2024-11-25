import type { Meta, StoryObj } from '@storybook/react';
import { CoffeeLogForm } from './CoffeeLogForm';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CoffeeLogForm> = {
  title: 'Components/Coffee/CoffeeLogForm',
  component: CoffeeLogForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CoffeeLogForm>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const originInput = canvas.getByPlaceholderText('e.g., Ethiopia Yirgacheffe');
    await userEvent.type(originInput, 'Ethiopia Yirgacheffe', { delay: 100 });
    
    const roastSelect = canvas.getByRole('combobox', { name: /roast level/i });
    await userEvent.selectOptions(roastSelect, 'Medium');
    
    const nextButton = canvas.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);
    
    // Wait for brewing info step
    const brewingMethodSelect = await canvas.findByRole('combobox', { name: /brewing method/i });
    await userEvent.selectOptions(brewingMethodSelect, 'Pour Over');
    
    const grindSizeSelect = canvas.getByRole('combobox', { name: /grind size/i });
    await userEvent.selectOptions(grindSizeSelect, 'Medium');
    
    const tempInput = canvas.getByPlaceholderText('e.g., 93');
    await userEvent.type(tempInput, '93');
    
    const ratioInput = canvas.getByPlaceholderText('e.g., 1:16');
    await userEvent.type(ratioInput, '1:16');
    
    await userEvent.click(nextButton);
    
    // Wait for tasting notes step
    const tastingNotesCheckboxes = await canvas.findAllByRole('checkbox');
    await userEvent.click(tastingNotesCheckboxes[0]); // Select first tasting note
    
    const ratingButtons = canvas.getAllByRole('button', { name: '★' });
    await userEvent.click(ratingButtons[4]); // 5-star rating
    
    await userEvent.click(nextButton);
    
    // Review step
    const submitButton = await canvas.findByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    // Success state
    const successMessage = await canvas.findByText(/coffee log has been saved successfully/i);
    await expect(successMessage).toBeInTheDocument();
  },
};

export const ErrorState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const originInput = canvas.getByPlaceholderText('e.g., Ethiopia Yirgacheffe');
    await userEvent.type(originInput, 'Test Origin');
    
    const nextButton = canvas.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);
    
    // Skip to review without filling required fields
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    
    const submitButton = await canvas.findByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
  },
};
