import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 md:p-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-gray-900">
                AFC
              </div>
              <h3 className="text-xl font-bold">
                ampUTADos <span className="text-yellow-600">FC</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Tienda oficial del club. Fundado en 2025, somos pasión, compromiso y tradición.
            </p>
            <div className="text-gray-400 space-y-2">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-600" /> Madrid, España
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-yellow-600" /> +34 606608740
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-600" /> tienda@amputadosfc.com
              </p>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">Sobre el Club</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">Hazte Socio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">Calendario</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">Noticias</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir ofertas exclusivas y novedades del club.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-600"
              />
              <button className="w-full bg-yellow-600 text-gray-900 px-6 py-2 rounded hover:bg-yellow-500 transition-colors font-bold">
                Suscribir
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>© 2025 ampUTADos FC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
