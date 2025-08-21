import Header from '@/components/Header';
import BalanceCard from '@/components/BalanceCard';
import ServicesGrid from '@/components/ServicesGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header 
        title="Hola, Juan" 
        subtitle="Bienvenido a SmartWallet"
      />
      
      <div className="pb-6">
        <BalanceCard balance={125000} />
      </div>
      
      <ServicesGrid />
      
      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ofertas personalizadas</h3>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <h4 className="text-xl font-bold mb-2">¡Oferta especial!</h4>
          <p className="text-purple-100 mb-4">20% de descuento en restaurantes cercanos</p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Ver ofertas
          </button>
        </div>
      </div>
    </main>
  )
}