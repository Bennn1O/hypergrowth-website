'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface EventGalleryProps {
  images: ImageItem[];
}

export default function EventGallery({ images }: EventGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  return (
    <>
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-4xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Fermer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="h-auto max-h-[90vh] w-auto rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
