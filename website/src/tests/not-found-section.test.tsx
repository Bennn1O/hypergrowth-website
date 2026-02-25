import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotFoundSection } from '@/src/app/(frontend)/components/not-found-section';

vi.mock('hugeicons-react', () => ({
  ArrowRight01Icon: (props: Record<string, unknown>) => <span data-testid="arrow-icon" {...props} />,
}));

describe('NotFoundSection', () => {
  describe('Rendu par défaut', () => {
    it('affiche le numéro 404', () => {
      render(<NotFoundSection />);
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('affiche le titre par défaut', () => {
      render(<NotFoundSection />);
      expect(screen.getByText('Page introuvable')).toBeInTheDocument();
    });

    it('affiche la description par défaut', () => {
      render(<NotFoundSection />);
      expect(
        screen.getByText(/Cette page n'existe pas \(ou plus\)/i),
      ).toBeInTheDocument();
    });

    it("affiche les boutons d'action par défaut", () => {
      render(<NotFoundSection />);
      expect(screen.getByRole('link', { name: /Retour à l'accueil/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /En savoir plus/i })).toBeInTheDocument();
    });

    it("affiche la section d'aide par défaut", () => {
      render(<NotFoundSection />);
      expect(screen.getByText("Besoin d'aide ?")).toBeInTheDocument();
    });
  });

  describe('Props personnalisées', () => {
    it('affiche un titre personnalisé', () => {
      render(<NotFoundSection title="Ressource non trouvée" />);
      expect(screen.getByText('Ressource non trouvée')).toBeInTheDocument();
    });

    it('affiche une description personnalisée', () => {
      render(<NotFoundSection description="Cette ressource n'existe pas." />);
      expect(screen.getByText("Cette ressource n'existe pas.")).toBeInTheDocument();
    });

    it('affiche un bouton primaire personnalisé', () => {
      render(
        <NotFoundSection
          primaryAction={{ label: 'Aller ailleurs', href: '/custom' }}
        />,
      );
      const link = screen.getByRole('link', { name: /Aller ailleurs/i });
      expect(link).toHaveAttribute('href', '/custom');
    });

    it('affiche un bouton secondaire personnalisé', () => {
      render(
        <NotFoundSection
          secondaryAction={{ label: 'Documentation', href: '/docs' }}
        />,
      );
      const link = screen.getByRole('link', { name: /Documentation/i });
      expect(link).toHaveAttribute('href', '/docs');
    });

    it("masque la section d'aide si showHelp=false", () => {
      render(<NotFoundSection showHelp={false} />);
      expect(screen.queryByText("Besoin d'aide ?")).not.toBeInTheDocument();
    });
  });

  describe('Contenu additionnel', () => {
    it('affiche les enfants passés en prop', () => {
      render(
        <NotFoundSection>
          <div>Contenu additionnel</div>
        </NotFoundSection>,
      );
      expect(screen.getByText('Contenu additionnel')).toBeInTheDocument();
    });

    it("affiche l'élément visuel personnalisé", () => {
      render(
        <NotFoundSection
          customVisual={<div data-testid="custom-visual">Visuel personnalisé</div>}
        />,
      );
      expect(screen.getByTestId('custom-visual')).toBeInTheDocument();
    });
  });

  describe("Section d'aide", () => {
    it("affiche les 4 liens d'aide par défaut", () => {
      render(<NotFoundSection />);
      expect(screen.getByRole('link', { name: /La Méthode OP-X/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Case Studies/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Événements/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /À Propos/i })).toBeInTheDocument();
    });

    it("les liens d'aide ont les bonnes URLs", () => {
      render(<NotFoundSection />);
      expect(screen.getByRole('link', { name: /La Méthode OP-X/i })).toHaveAttribute(
        'href',
        '/concept/methode-op-x',
      );
      expect(screen.getByRole('link', { name: /Case Studies/i })).toHaveAttribute(
        'href',
        '/concept/case-studies',
      );
    });
  });

  describe('Accessibilité', () => {
    it('utilise la sémantique HTML correcte (section/nav)', () => {
      const { container } = render(<NotFoundSection />);
      expect(container.querySelector('section')).toBeInTheDocument();
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('les titres sont bien structurés (h1 > h2)', () => {
      const { container } = render(<NotFoundSection />);
      const h1 = container.querySelector('h1');
      const h2 = container.querySelector('h2');

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h1?.compareDocumentPosition(h2!)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });

    it('tous les liens ont un href', () => {
      const { container } = render(<NotFoundSection />);
      const links = container.querySelectorAll('a');

      expect(links.length).toBeGreaterThan(0);

      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Intégration', () => {
    it('fonctionne avec tous les props personnalisés ensemble', () => {
      render(
        <NotFoundSection
          title="Test custom"
          description="Description test"
          primaryAction={{ label: 'Action 1', href: '/test1' }}
          secondaryAction={{ label: 'Action 2', href: '/test2' }}
          showHelp={true}
        >
          <p>Contenu enfant</p>
        </NotFoundSection>,
      );

      expect(screen.getByText('Test custom')).toBeInTheDocument();
      expect(screen.getByText('Description test')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Action 1/i })).toHaveAttribute('href', '/test1');
      expect(screen.getByRole('link', { name: /Action 2/i })).toHaveAttribute('href', '/test2');
      expect(screen.getByText("Besoin d'aide ?")).toBeInTheDocument();
      expect(screen.getByText('Contenu enfant')).toBeInTheDocument();
    });
  });
});
