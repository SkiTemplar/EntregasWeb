import { FaArrowUp } from 'react-icons/fa'

export default function Stats() {
  const stats = [
    {
      label: "Socios del Club",
      value: "8.2B+",
      change: "+15%",
      color: "bg-yellow-600",
      featured: true
    },
    {
      label: "Productos Vendidos",
      value: "600M+",
      change: "+23%",
      color: "bg-yellow-600"
    },
    {
      label: "Valoración Media",
      value: "10.0",
      change: "+8%",
      color: "bg-yellow-600",
    },
    {
      label: "Años de Historia",
      value: "<1",
      change: "Desde 2025",
      color: "bg-yellow-600"
    }
  ]

  return (
    <section className="p-4 md:p-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          Nuestro Club
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${stat.featured ? 'md:col-span-2' : ''}`}
            >
              <div className="text-sm uppercase mb-2">
                {stat.label}
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm flex items-center gap-1">
                {stat.change.includes('+') && <FaArrowUp />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
