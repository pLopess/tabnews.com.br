import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import KeyboardNavigationUp from 'pages/interface/components/KeyboardNavigationUp';

describe('KeyboardNavigationUp', () => {
  it('should detect arrow up keypress', () => {
    const mockOnNavigateUp = vi.fn();
    
    render(
      <KeyboardNavigationUp onNavigateUp={mockOnNavigateUp}>
        <div>Test content</div>
      </KeyboardNavigationUp>
    );

    // Simula pressionar seta para cima
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(mockOnNavigateUp).toHaveBeenCalledTimes(1);
  });

  it('should not detect other keys', () => {
    const mockOnNavigateUp = vi.fn();
    
    render(
      <KeyboardNavigationUp onNavigateUp={mockOnNavigateUp}>
        <div>Test content</div>
      </KeyboardNavigationUp>
    );

    // Simula pressionar outras teclas
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(document, { key: 'Space', code: 'Space' });

    expect(mockOnNavigateUp).toHaveBeenCalledTimes(0);
  });

  it('should not trigger navigation when input is focused', () => {
    const mockOnNavigateUp = vi.fn();
    
    const { container } = render(
      <KeyboardNavigationUp onNavigateUp={mockOnNavigateUp}>
        <input type="text" />
      </KeyboardNavigationUp>
    );

    const input = container.querySelector('input');
    input.focus();

    // Simula pressionar seta para cima enquanto input está focado
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(mockOnNavigateUp).toHaveBeenCalledTimes(0);
  });
});
