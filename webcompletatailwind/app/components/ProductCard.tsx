import Image from 'next/image'

interface ProductCardProps {
  name: string
  description: string
  price: string
  image: string
  featured?: boolean
}

export default function ProductCard({ name, description, price, image, featured = false }: ProductCardProps) {
  return (
    <div className={`bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-yellow-600 ${featured ? 'sm:col-span-2' : ''}`}>
      <div className="bg-gray-800 h-48 flex items-center justify-center border-b-4 border-yellow-600 relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-yellow-600">{price}</span>
          <button className="bg-yellow-600 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition-colors font-bold">
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}
