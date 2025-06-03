import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// setupTests.ts
import '@testing-library/jest-dom';
import App from './App';

// Silence console.log for cleaner test output
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('App Component', () => {
  it('renders input and button', () => {
    render(<App />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('updates name when input changes', () => {
    render(<App />);
    const input = screen.getByLabelText(/full name/i);
    fireEvent.change(input, { target: { value: 'Krishna' } });
    expect((input as HTMLInputElement).value).toBe('Krishna');
  });

  it('displays greeting after submit', () => {
    render(<App />);
    const input = screen.getByLabelText(/full name/i);
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'Radha' } });
    fireEvent.click(button);

    expect(screen.getByText(/hello buddy radha/i)).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith(expect.objectContaining({ preventDefault: expect.any(Function) }));
    expect(console.log).toHaveBeenCalledWith("Name:", "Radha");
  });

  it('does not show greeting if input is empty', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);
    expect(screen.queryByText(/hello buddy/i)).not.toBeInTheDocument();
  });
});