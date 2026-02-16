import Image from 'next/image'

interface TeamMemberCardProps {
  name: string
  role: string
  image?: string
}

export function TeamMemberCard({ name, role, image }: TeamMemberCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors">
      {image && (
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto border-2 border-purple-600">
          <Image
            src={`/images/${image}`}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-bold text-white text-center mb-2">{name}</h3>
      <p className="text-sm text-gray-400 text-center">{role}</p>
    </div>
  )
}
