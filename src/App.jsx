import { useCart } from './hooks/useCart'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import OrderSection from './components/OrderSection'
import WhyUs from './components/WhyUs'
import Pickup from './components/Pickup'
import Footer from './components/Footer'
import CartBar from './components/CartBar'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  const cart = useCart()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu cart={cart} />
        <OrderSection cart={cart} />
        <WhyUs />
        <Pickup />
      </main>
      <Footer />
      <CartBar cart={cart} />
      <WhatsAppFab raised={!cart.isEmpty} />
    </>
  )
}
