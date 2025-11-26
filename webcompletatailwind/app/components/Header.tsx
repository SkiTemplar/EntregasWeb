"use client"

import { HiMenu } from 'react-icons/hi'
import { useState } from 'react'
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white w-full">
      <nav className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
                <Image
                    src="/images/logo.png"
                    alt="ampUTADos FC"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

          <div className="text-xl md:text-2xl font-bold">
            ampUTADos <span className="text-yellow-600">FC</span>
          </div>
        </div>

        {/* Links - visibles en tablet/desktop */}
        <div className="hidden md:flex gap-6">
          <a href="#inicio" className="hover:text-yellow-600 transition-colors">Inicio</a>
          <a href="#tienda" className="hover:text-yellow-600 transition-colors">Tienda</a>
          <a href="#equipo" className="hover:text-yellow-600 transition-colors">Equipo</a>
          <a href="#contacto" className="hover:text-yellow-600 transition-colors">Contacto</a>
        </div>

        {/* Hamburguesa - solo móvil */}
        <button
          className="md:hidden text-3xl text-yellow-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiMenu />
        </button>
      </nav>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="flex flex-col p-4 space-y-3">
            <a href="#inicio" className="hover:text-yellow-600 py-2">Inicio</a>
            <a href="#tienda" className="hover:text-yellow-600 py-2">Tienda</a>
            <a href="#equipo" className="hover:text-yellow-600 py-2">Equipo</a>
            <a href="#contacto" className="hover:text-yellow-600 py-2">Contacto</a>
          </div>
        </div>
      )}
    </header>
  )
}