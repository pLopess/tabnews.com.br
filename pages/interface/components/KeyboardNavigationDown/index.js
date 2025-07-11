 import { useEffect } from 'react';

export default function KeyboardNavigationDown({ children, onNavigateDown }) {
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

      // Detecta apenas seta para baixo
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onNavigateDown?.();
      }
    };

    // Adiciona o listener global
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNavigateDown]);

  return children;
}
