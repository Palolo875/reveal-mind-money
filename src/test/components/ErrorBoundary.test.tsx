import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Composant qui lance une erreur pour tester l'ErrorBoundary
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Mock console.error pour éviter les logs de test
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  beforeEach(() => {
    consoleErrorSpy.mockClear();
    localStorage.clear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('devrait rendre les enfants quand il n\'y a pas d\'erreur', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('devrait afficher l\'interface d\'erreur quand une erreur survient', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Quelque chose s\'est mal passé')).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Réessayer/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Retour à l'accueil/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signaler le problème/ })).toBeInTheDocument();
  });

  it('devrait logger l\'erreur dans localStorage', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const lastError = localStorage.getItem('lastError');
    expect(lastError).not.toBeNull();
    
    const errorReport = JSON.parse(lastError!);
    expect(errorReport.message).toBe('Test error');
    expect(errorReport.timestamp).toBeDefined();
    expect(errorReport.userAgent).toBeDefined();
  });

  it('devrait permettre de réessayer', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /Réessayer/ });
    fireEvent.click(retryButton);

    // Rerender avec pas d'erreur
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('devrait utiliser le fallback personnalisé si fourni', () => {
    const CustomFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
      <div>
        <h1>Erreur personnalisée</h1>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Reset</button>
      </div>
    );

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Erreur personnalisée')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/ })).toBeInTheDocument();
  });

  it('devrait ouvrir le système de rapport d\'erreur', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const reportButton = screen.getByRole('button', { name: /Signaler le problème/ });
    fireEvent.click(reportButton);

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('mailto:support@rivela.app')
    );
  });

  it('devrait générer un ID d\'erreur unique', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const errorIdElement = screen.getByText(/Erreur #/);
    expect(errorIdElement).toBeInTheDocument();
    
    // Vérifier que l'ID a la bonne format (8 caractères)
    const idMatch = errorIdElement.textContent?.match(/Erreur #([a-z0-9]{8})/);
    expect(idMatch).toBeTruthy();
    expect(idMatch![1]).toHaveLength(8);
  });

  it('devrait afficher les détails techniques en mode développement', () => {
    // Simuler l'environnement de développement
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('🔧 Détails techniques (mode développement)')).toBeInTheDocument();
    
    // Restaurer l'environnement original
    process.env.NODE_ENV = originalEnv;
  });

  it('ne devrait pas afficher les détails techniques en production', () => {
    // Simuler l'environnement de production
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.queryByText('🔧 Détails techniques (mode développement)')).not.toBeInTheDocument();
    
    // Restaurer l'environnement original
    process.env.NODE_ENV = originalEnv;
  });
});