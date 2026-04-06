import { client } from '@/sanity/lib/client'
import { ALL_TESTIMONIALS_QUERY } from '@/sanity/lib/queries'

export interface Testimonial {
  id: string
  author: string
  role: string | null
  company: string | null
  companyUrl: string | null
  linkedinUrl: string | null
  photo: string | null
  quote: string
  featured: boolean
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const data = await client.fetch(ALL_TESTIMONIALS_QUERY)
  return (data ?? []) as Testimonial[]
}
