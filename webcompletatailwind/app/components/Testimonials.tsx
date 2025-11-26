import { FaStar } from 'react-icons/fa'
import Image from 'next/image'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Boniats Villalobos",
      avatar: "/images/Boniats.jpg",
      comment: "Soy jugador oficial del equipo y las camisetas son increibles. Me la puse hasta en la boda de mi pana Mokius. Ahora mi novia Alicia me ha dejado por ir siempre con la camiseta puesta."
    },
    {
      name: "Jose Antonio Mokius",
      avatar: "/images/Mokius.jpg",
      comment: "El mejor equipo del mundo, nunca ha perdido una final de champions. Me puse la camiseta en mi boda y todo el mundo alucino. Casi me ayuda a ganarle a Makaks en el clash royale."
    },
    {
      name: "Ricardo Palacios",
      avatar: "/images/Gigachad.png",
      comment: "La pagina web es perfecta. Si fuese profesor de Desarrollo Web me la pondria de ejemplo en clase y le daria un 10. Ah, espera que si que soy profesor, un 10 para el autor."
    }
  ]

  return (
    <section className="p-4 md:p-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          Lo que Dicen Nuestros <span className="text-yellow-600">Socios</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg border-l-4 border-yellow-600 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 relative bg-gray-800">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>
                  <div className="text-yellow-600 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic">
                &quot;{testimonial.comment}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

