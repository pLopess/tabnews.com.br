import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import KeyboardNavigation from 'pages/interface/components/KeyboardNavigation';

describe('KeyboardNavigation (Refactored)', () => {
  it('should detect arrow down keypress', () => {
    const mockOnNavigateDown = vi.fn();
    const mockOnNavigateUp = vi.fn();
    
    render(
      <KeyboardNavigation 
        onNavigateDown={mockOnNavigateDown}
        onNavigateUp={mockOnNavigateUp}
      >
        <div>Test content</div>
      </KeyboardNavigation>
    );

    // Simula pressionar seta para baixo
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });

    expect(mockOnNavigateDown).toHaveBeenCalledTimes(1);
    expect(mockOnNavigateUp).toHaveBeenCalledTimes(0);
  });

  it('should detect arrow up keypress', () => {
    const mockOnNavigateDown = vi.fn();
    const mockOnNavigateUp = vi.fn();
    
    render(
      <KeyboardNavigation 
        onNavigateDown={mockOnNavigateDown}
        onNavigateUp={mockOnNavigateUp}
      >
        <div>Test content</div>
      </KeyboardNavigation>
    );

    // Simula pressionar seta para cima
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(mockOnNavigateUp).toHaveBeenCalledTimes(1);
    expect(mockOnNavigateDown).toHaveBeenCalledTimes(0);
  });

  it('should handle both arrows in the same component', () => {
    const mockOnNavigateDown = vi.fn();
    const mockOnNavigateUp = vi.fn();
    
    render(
      <KeyboardNavigation 
        onNavigateDown={mockOnNavigateDown}
        onNavigateUp={mockOnNavigateUp}
      >
        <div>Test content</div>
      </KeyboardNavigation>
    );

    // Simula pressionar ambas as setas
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });

    expect(mockOnNavigateDown).toHaveBeenCalledTimes(2);
    expect(mockOnNavigateUp).toHaveBeenCalledTimes(1);
  });

  it('should work with only one callback provided', () => {
    const mockOnNavigateDown = vi.fn();
    
    render(
      <KeyboardNavigation onNavigateDown={mockOnNavigateDown}>
        <div>Test content</div>
      </KeyboardNavigation>
    );

    // Simula pressionar ambas as setas
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(mockOnNavigateDown).toHaveBeenCalledTimes(1);
  });

  it('should not trigger navigation when input is focused', () => {
    const mockOnNavigateDown = vi.fn();
    const mockOnNavigateUp = vi.fn();
    
    const { container } = render(
      <KeyboardNavigation 
        onNavigateDown={mockOnNavigateDown}
        onNavigateUp={mockOnNavigateUp}
      >
        <input type="text" />
      </KeyboardNavigation>
    );

    const input = container.querySelector('input');
    input.focus();

    // Simula pressionar ambas as setas enquanto input está focado
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(mockOnNavigateDown).toHaveBeenCalledTimes(0);
    expect(mockOnNavigateUp).toHaveBeenCalledTimes(0);
  });
});
