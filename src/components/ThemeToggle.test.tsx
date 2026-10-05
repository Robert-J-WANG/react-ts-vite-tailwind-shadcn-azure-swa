import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { THEME_STORAGE_KEY } from '@/app/theme/theme';
import { ThemeToggle } from '@/components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  });

  it('switches theme and persists the explicit choice', () => {
    render(<ThemeToggle />);

    const toggle = screen.getByTitle('Switch to dark theme');
    fireEvent.click(toggle);

    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByTitle('Switch to light theme')).toBeInTheDocument();
  });
});
