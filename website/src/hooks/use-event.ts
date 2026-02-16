/**
 * Hook pour récupérer les données d'un événement
 * À adapter selon votre source de données (API, CMS, DB, etc.)
 */

import { EventData } from '@/src/components/sections/types';

// Données statiques de test
const EVENTS_DATABASE: Record<string, EventData> = {
  'mastermind-srilanka': {
    id: 'mastermind-srilanka',
    title: 'Mastermind Sri Lanka',
    category: 'Mastermind',
    categoryDescription:
      'De 4 à 10 jours dans un lieu privé, à l\'étranger, activités, moments d\'échange et de networking. Vous vous créez un réseau solide et vivez une aventure avec d\'autres dirigeants.',
    location: 'Weligama',
    country: 'SRI LANKA',
    dateStart: '2025-11-29',
    dateEnd: '2025-12-07',
    startFormatted: 'November 29, 2025',
    endFormatted: 'December 7, 2025',
    status: 'past',
    description:
      'Le Mastermind Hypergrowth est un cercle restreint de 10–20 entrepreneurs en hyper-croissance, réunis pour scaler plus vite grâce à un environnement d\'exigence et de clarté. Le principe : l\'entreprise ne peut pas aller plus loin que le dirigeant, donc on travaille sur les deux en parallèle.',
    images: [
      {
        id: 1,
        src: '/images/events/mastermind-srilanka-1.avif',
        alt: 'Tangalle, vue aérienne de Sri Lanka',
        width: 1200,
        height: 800,
      },
      {
        id: 2,
        src: '/images/events/mastermind-srilanka-2.avif',
        alt: 'Kima Surf, Weligama Sri Lanka',
        width: 1200,
        height: 800,
      },
      {
        id: 3,
        src: '/images/events/mastermind-srilanka-3.avif',
        alt: 'Paysage Sri Lanka',
        width: 1200,
        height: 800,
      },
      {
        id: 4,
        src: '/images/events/mastermind-srilanka-4.avif',
        alt: 'Participants Mastermind',
        width: 1200,
        height: 800,
      },
    ],
  },
  'cafe-croissance-lille': {
    id: 'cafe-croissance-lille',
    title: 'Café Croissance Lille',
    category: 'Café Croissance',
    categoryDescription:
      'Un format hot seat de 8h à 15h. Vous présentez votre projet face à 10 entrepreneurs et dirigeants confirmés.',
    location: 'Lille',
    country: 'FRANCE',
    dateStart: '2025-12-17',
    dateEnd: '',
    startFormatted: 'December 17, 2025',
    endFormatted: '',
    status: 'upcoming',
    description:
      'Format concentré d\'une journée. Vous êtes au cœur d\'une session de 8h à 15h où vous présentez votre projet à une assemblée de 10 entrepreneurs et dirigeants confirmés.',
    images: [
      {
        id: 1,
        src: '/images/cafe-croissance-01.avif',
        alt: 'Lieu de l\'événement à Lille',
        width: 1200,
        height: 800,
      },
      {
        id: 2,
        src: '/images/cafe-croissance-02.avif',
        alt: 'Participants discutant',
        width: 1200,
        height: 800,
      },
    ],
  },
};

/**
 * Récupère les données d'un événement par son ID
 * @param eventId - L'identifiant de l'événement (ex: 'mastermind-srilanka')
 * @returns Les données de l'événement ou null
 */
export function useEvent(eventId: string): EventData | null {
  // TODO: Remplacer par un appel API réel
  // const { data, isLoading, error } = useSWR(`/api/events/${eventId}`);
  // if (isLoading) return null;
  // if (error) return null;
  // return data;

  // Pour le développement, utiliser la base de données locale
  return EVENTS_DATABASE[eventId] || null;
}

/**
 * Récupère tous les événements
 * @returns Un tableau de tous les événements
 */
export function useEvents(): EventData[] {
  // TODO: Remplacer par un appel API réel
  // const { data, isLoading } = useSWR('/api/events');
  // return isLoading ? [] : data || [];

  return Object.values(EVENTS_DATABASE);
}

/**
 * Récupère les événements filtrés par statut
 * @param status - 'past' ou 'upcoming'
 * @returns Un tableau d'événements filtrés
 */
export function useEventsByStatus(status: 'past' | 'upcoming'): EventData[] {
  return Object.values(EVENTS_DATABASE).filter((event) => event.status === status);
}

/**
 * Récupère les événements filtrés par catégorie
 * @param category - 'Mastermind', 'Café Croissance', ou 'Dîners HyperClub'
 * @returns Un tableau d'événements filtrés
 */
export function useEventsByCategory(
  category: 'Mastermind' | 'Café Croissance' | 'Dîners HyperClub'
): EventData[] {
  return Object.values(EVENTS_DATABASE).filter(
    (event) => event.category === category
  );
}

/**
 * Ajoute un événement à la base de données locale
 * Utile pour le développement et les tests
 * @param event - L'événement à ajouter
 */
export function addEvent(event: EventData): void {
  EVENTS_DATABASE[event.id] = event;
}

/**
 * Supprime un événement de la base de données locale
 * Utile pour le développement et les tests
 * @param eventId - L'identifiant de l'événement à supprimer
 */
export function removeEvent(eventId: string): void {
  delete EVENTS_DATABASE[eventId];
}

/**
 * Réinitialise la base de données locale
 * Utile pour les tests
 */
export function resetEvents(): void {
  Object.keys(EVENTS_DATABASE).forEach((key) => {
    if (key !== 'mastermind-srilanka' && key !== 'cafe-croissance-lille') {
      delete EVENTS_DATABASE[key];
    }
  });
}
