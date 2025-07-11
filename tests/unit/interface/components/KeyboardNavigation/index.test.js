import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import KeyboardNavigationDown from 'pages/interface/components/KeyboardNavigationDown';

describe('KeyboardNavigationDown', () => {
  it('should detect arrow down keypress', () => {
    const mockOnNavigateDown = vi.fn();
    
    render(
      <KeyboardNavigationDown onNavigateDown={mockOnNavigateDown}>
        <div>Test content</div>
      </KeyboardNavigationDown>
    );

    // Simula pressionar seta para baixo
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });

    expect(mockOnNavigateDown).toHaveBeenCalledTimes(1);
  });

  it('should not detect other keys', () => {
    const mockOnNavigateDown = vi.fn();
    
    render(
      <KeyboardNavigationDown onNavigateDown={mockOnNavigateDown}>
        <div>Test content</div>
      </KeyboardNavigationDown>
    );

    // Simula pressionar outras teclas
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(document, { key: 'Space', code: 'Space' });

    expect(mockOnNavigateDown).toHaveBeenCalledTimes(0);
  });

  it('should not trigger navigation when input is focused', () => {
    const mockOnNavigateDown = vi.fn();
    
    const { container } = render(
      <KeyboardNavigationDown onNavigateDown={mockOnNavigateDown}>
        <input type="text" />
      </KeyboardNavigationDown>
    );

    const input = container.querySelector('input');
    input.focus();

    // Simula pressionar seta para baixo enquanto input está focado
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });

    expect(mockOnNavigateDown).toHaveBeenCalledTimes(0);
  });
});
