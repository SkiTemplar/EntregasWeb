import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import ProductGallery from './ProductGallery'
import Stats from './Stats'
import Testimonials from './Testimonials'
import Footer from './Footer'

export default function Ejercicio() {
  return (
    <div className="min-h-screen bg-[#0a1128]">
      <Header />
      <Hero />
      <Features />
      <ProductGallery />
      <Stats />
      <Testimonials />
      <Footer />
    </div>
  )
}
