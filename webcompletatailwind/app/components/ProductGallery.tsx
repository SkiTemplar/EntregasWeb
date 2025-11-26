import ProductCard from './ProductCard'

export default function ProductGallery() {
  const products = [
    {
      name: "Camiseta Oficial 25/26",
      description: "Primera equipación temporada actual",
      price: "189.99€",
      image: "/images/CAMISETA.png",
      featured: true
    },
    {
      name: "Calzoncillos Oficiales Del Jugador a Elección",
      description: "Calzoncillos oficiales del jugador seleccionado, usados en el último partido",
      price: "2,399.99€",
      image: "/images/calzoncillos-removebg-preview.png"
    },
    {
      name: "Tatuaje permanente en la frente",
      description: "Tatuaje con el escudo del club en la frente",
      price: "15.99€",
      image: "/images/logo.png"
    },
    {
      name: "Gorra Oficial",
      description: "Gorra oficial para cubrirse el tatuaje en la frente",
      price: "285.99€",
      image: "/images/gorra-removebg-preview.png"
    },
    {
      name: "Calcetín individual oficial",
      description: "Calcetín oficial del ampUTADos FC (1 unidad)",
      price: "949.99€",
      image: "/images/calcetín-removebg-preview.png"
    },
    {
      name: "Balón Oficial",
      description: "Balón oficial de entrenamiento, viene pinchado",
      price: "89.99€",
      image: "/images/balon.png"
    }
  ]

  return (
    <section className="p-4 md:p-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          Productos <span className="text-yellow-600">Destacados</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
