interface User {
  username: string;
  age: number;
  id: string;
}

interface OffersCarouselProps {
  user: User | null;
}

export default function OffersCarousel({ user }: OffersCarouselProps) {
  if (!user) return null;

  // Ofertas para juan_19 (19 años - joven)
  const youngOffers = [
    {
      emoji: "🍔",
      name: "McDonald's",
      description: "30% OFF en combos",
      badge: "Hasta 23:59",
      gradient: "from-orange-400 to-red-500",
      badgeColor: "text-orange-500"
    },
    {
      emoji: "🎮",
      name: "GameStop",
      description: "2x1 en juegos indie",
      badge: "Solo hoy",
      gradient: "from-purple-400 to-blue-500",
      badgeColor: "text-purple-500"
    },
    {
      emoji: "🎵",
      name: "Spotify",
      description: "3 meses gratis Premium",
      badge: "Nuevos usuarios",
      gradient: "from-green-400 to-teal-500",
      badgeColor: "text-green-500"
    },
    {
      emoji: "🎬",
      name: "Cine Atlas",
      description: "Entrada a $800",
      badge: "Martes y miércoles",
      gradient: "from-yellow-400 to-orange-500",
      badgeColor: "text-yellow-600"
    }
  ];

  // Ofertas para carlos_45 (45 años - senior)
  const seniorOffers = [
    {
      emoji: "🏥",
      name: "Farmacity",
      description: "25% OFF en medicamentos",
      badge: "Con receta",
      gradient: "from-blue-400 to-cyan-500",
      badgeColor: "text-blue-500"
    },
    {
      emoji: "🛒",
      name: "Carrefour",
      description: "15% en compras +$5000",
      badge: "Fin de semana",
      gradient: "from-pink-400 to-purple-500",
      badgeColor: "text-pink-500"
    },
    {
      emoji: "☕",
      name: "Café Martínez",
      description: "Café + medialunas $650",
      badge: "Desayuno completo",
      gradient: "from-amber-400 to-orange-500",
      badgeColor: "text-amber-600"
    },
    {
      emoji: "🚗",
      name: "YPF",
      description: "10% OFF en combustible",
      badge: "Con tarjeta",
      gradient: "from-gray-400 to-gray-600",
      badgeColor: "text-gray-600"
    }
  ];

  const offers = user.age < 30 ? youngOffers : seniorOffers;

  return (
    <div className="mt-6">
      <h4 className="text-md font-medium text-gray-700 mb-3">
        Ofertas para disfrutar {user.age < 30 ? 'con tus amigos' : 'junto a tu familia'}
      </h4>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`flex-shrink-0 bg-gradient-to-br ${offer.gradient} rounded-xl p-4 text-white w-64`}
          >
            <div className="text-2xl mb-2">{offer.emoji}</div>
            <h5 className="font-bold text-lg mb-1">{offer.name}</h5>
            <p className="text-white/80 text-sm mb-2">{offer.description}</p>
            <span className={`bg-white ${offer.badgeColor} px-2 py-1 rounded-full text-xs font-medium`}>
              {offer.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}