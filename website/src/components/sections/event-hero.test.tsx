/**
 * Test exemple pour EventHero component
 * À adapter selon votre framework de test (Vitest, Jest, etc.)
 */

import { render, screen } from '@testing-library/react';
import EventHero from './event-hero';

const mockEvent = {
  title: 'Mastermind Sri Lanka',
  category: 'Mastermind',
  categoryDescription: 'De 4 à 10 jours dans un lieu privé...',
  location: 'Weligama',
  country: 'SRI LANKA',
  startFormatted: 'November 29, 2025',
  endFormatted: 'December 7, 2025',
  status: 'past' as const,
  description:
    'Le Mastermind Hypergrowth est un cercle restreint de 10–20 entrepreneurs...',
};

describe('EventHero Component', () => {
  it('should render event title', () => {
    render(<EventHero event={mockEvent} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Mastermind Sri Lanka'
    );
  });

  it('should display event category', () => {
    render(<EventHero event={mockEvent} />);
    expect(screen.getByText('Mastermind')).toBeInTheDocument();
  });

  it('should show event status badge', () => {
    render(<EventHero event={mockEvent} />);
    expect(screen.getByText('Évènement passé')).toBeInTheDocument();
  });

  it('should display event dates', () => {
    render(<EventHero event={mockEvent} />);
    expect(screen.getByText('November 29, 2025')).toBeInTheDocument();
    expect(screen.getByText('December 7, 2025')).toBeInTheDocument();
  });

  it('should display location and country', () => {
    render(<EventHero event={mockEvent} />);
    expect(screen.getByText('Weligama')).toBeInTheDocument();
    expect(screen.getByText('SRI LANKA')).toBeInTheDocument();
  });

  it('should render event description', () => {
    render(<EventHero event={mockEvent} />);
    expect(
      screen.getByText(
        /Le Mastermind Hypergrowth est un cercle restreint de 10–20 entrepreneurs/
      )
    ).toBeInTheDocument();
  });

  it('should render category description in glassmorphism box', () => {
    render(<EventHero event={mockEvent} />);
    expect(
      screen.getByText(/De 4 à 10 jours dans un lieu privé/)
    ).toBeInTheDocument();
  });

  it('should have CTA buttons', () => {
    render(<EventHero event={mockEvent} />);
    expect(screen.getByRole('link', { name: /Nous contacter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /S'inscrire/i })).toBeInTheDocument();
  });

  it('should have "Sur inscription" badge on CTA section', () => {
    render(<EventHero event={mockEvent} />);
    const badges = screen.getAllByText('Sur inscription');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should be responsive on mobile', () => {
    render(<EventHero event={mockEvent} />);
    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('lg:grid-cols-[2fr_1fr]');
  });

  it('should have proper links', () => {
    render(<EventHero event={mockEvent} />);
    const contactLink = screen.getByRole('link', { name: /Nous contacter/i });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('should show upcoming status for future events', () => {
    const upcomingEvent = { ...mockEvent, status: 'upcoming' as const };
    render(<EventHero event={upcomingEvent} />);
    expect(screen.getByText('Prochain évènement')).toBeInTheDocument();
  });
});
