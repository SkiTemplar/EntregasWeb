import Image from 'next/image'

export default function Hero() {
  return (
    <section className="p-4 md:p-8 bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center max-w-7xl mx-auto">
        {/* Imagen - primero en móvil */}
        <div className="order-1 md:order-2">
          <div className="rounded-lg h-64 md:h-96 flex items-center justify-center shadow-lg border-4 border-yellow-600 relative overflow-hidden">
            <Image
              src="/images/logoencamisetabordadoampliado.png"
              alt="ampUTADos FC"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Texto - segundo en móvil */}
        <div className="order-2 md:order-1 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Tienda Oficial <span className="text-yellow-600">ampUTADos FC</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Viste los colores de tu equipo. Productos oficiales con la calidad que no mereces pero dejaremos que la puedas llevar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6">
            <button className="bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-bold">
              Comprar Ahora
            </button>
            <button className="border-2 border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-600 hover:text-gray-900 transition-colors font-bold">
              Ver Colección
            </button>
            <button className="border-2 border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-600 hover:text-gray-900 transition-colors font-bold">
                Apuesta por Nosotros
            </button>
            <button className="bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-bold">
              Nuestra Plantilla
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}
