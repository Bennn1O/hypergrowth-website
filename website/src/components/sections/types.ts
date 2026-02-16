/**
 * Types partagés pour les composants d'événement
 */

export interface EventImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface EventData {
  id: string;
  title: string;
  category: string;
  categoryDescription: string;
  location: string;
  country: string;
  dateStart: string;
  dateEnd: string;
  startFormatted: string;
  endFormatted: string;
  status: 'past' | 'upcoming';
  description: string;
  images: EventImage[];
}

/**
 * Props pour EventHero
 * Affiche les informations principales de l'événement
 */
export interface EventHeroProps {
  event: Omit<EventData, 'images' | 'id' | 'dateStart' | 'dateEnd'>;
}

/**
 * Props pour EventGallery
 * Affiche la galerie d'images avec lightbox
 */
export interface EventGalleryProps {
  images: EventImage[];
}

/**
 * Props pour EventCTA
 * Affiche les boutons d'action rapide
 */
export interface EventCTAProps {
  title: string;
  date: string;
}

/**
 * Props pour RelatedEvents
 * Affiche les autres événements disponibles
 */
export interface RelatedEventsProps {
  currentEventId: string;
}

/**
 * Type pour les événements liés affichés dans RelatedEvents
 */
export interface RelatedEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  country: string;
  status: 'past' | 'upcoming';
  description: string;
}

/**
 * Type pour les types d'événement (catégories)
 */
export interface EventType {
  title: string;
  status: string;
  description: string;
}
