import {FaTruck, FaCheckCircle, FaUndo, FaStar, FaMoneyCheck} from 'react-icons/fa'
import {FaShield} from "react-icons/fa6";

export default function Features() {
  const features = [
    {
      icon: FaShield,
      title: "Legado Histórico",
      description: "Desde hace 2 meses apoyando al equipo"
    },
    {
      icon: FaCheckCircle,
      title: "Productos Oficiales",
      description: "80% originales con licencia no oficial"
    },
    {
      icon: FaMoneyCheck,
      title: "Devoluciones No Gratuitas",
      description: "Pago de 10.99€ por devolución (+1.5% interés al día)"
    },
    {
      icon: FaStar,
      title: "Calidad casi garantizada",
      description: "Materiales de calidades cuestionables"
    }
  ]

  return (
    <section className="p-4 md:p-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          ¿Por Qué Comprar Aquí?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-600"
              >
                <div className="text-yellow-600 flex justify-center mb-4">
                  <IconComponent className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white text-center">{feature.title}</h3>
                <p className="text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
