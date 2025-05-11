import { Card as CardType } from '@/types/CardType';
import { ChevronRight, MapPin, Star } from "lucide-react";
import Image from "next/image";

interface CardProps {
  card: CardType;
}

export function Card({ card }: CardProps) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="relative h-40 bg-gray-200">
        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 rounded-full">
          <ChevronRight className="rotate-180" size={20} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 rounded-full p-2">
            <Image src={card.images[0]} alt={card.title} width={24} height={24} />
          </div>
        </div>
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 rounded-full">
          <ChevronRight size={20} />
        </button>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="flex gap-1">
            {card.images.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-black' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mt-1">{card.description}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
              {card.category}
            </span>
          </div>

        </div>
        <button className="w-full mt-3 text-left text-sm text-black font-medium">
          Подробнее
          <ChevronRight className="inline ml-12" size={16} />
        </button>
      </div>
    </div>
  );
}