import { useEffect } from 'react';

export default function KeyboardNavigation({ children, onNavigateDown, onNavigateUp }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Verifica se algum input, textarea ou elemento editável está focado
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
      );

      // Se há input focado, não faz nada
      if (isInputFocused) {
        return;
      }

      // Detecta setas do teclado
      if (event.key === 'ArrowDown' && onNavigateDown) {
        event.preventDefault();
        onNavigateDown();
      } else if (event.key === 'ArrowUp' && onNavigateUp) {
        event.preventDefault();
        onNavigateUp();
      }
    };

    // Adiciona o listener global
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNavigateDown, onNavigateUp]);

  return children;
}
