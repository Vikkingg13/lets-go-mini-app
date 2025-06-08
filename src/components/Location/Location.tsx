import { Location as LocationType } from '@/types/Location';
import { ChevronRight, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { locationTypeMap } from '@/constants/locationTypes';
import { badgeColors } from '@/constants/badgeColors';

interface LocationProps {
  location: LocationType;
}

export function Location({ location }: LocationProps) {

  const [liked, setLiked] = useState(false);


  const gradients = [
    'from-violet-200 via-fuchsia-200 to-pink-200',
    'from-cyan-200 via-sky-200 to-blue-200',
    'from-amber-200 via-orange-200 to-red-200',
    'from-lime-200 via-emerald-200 to-teal-200',
    'from-rose-200 via-pink-200 to-fuchsia-200',
    'from-blue-200 via-indigo-200 to-violet-200',
    'from-green-200 via-emerald-200 to-teal-200',
    'from-orange-200 via-amber-200 to-yellow-200',
    'from-purple-200 via-violet-200 to-indigo-200',
    'from-pink-200 via-rose-200 to-red-200'
  ];

  const [randomGradient] = useState(() =>
    gradients[Math.floor(Math.random() * gradients.length)]
  );

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/${location.documentId}`);
  }

  return (
    <div className="border rounded-xl overflow-hidden text-black">
      
      <div className="relative h-40 bg-gray-200">
        <button className="absolute right-2 top-1/2 z-10 transform -translate-y-1/2 bg-white/60 p-1 rounded-full transition-all duration-200 shadow hover:shadow-lg active:scale-90 active:translate-x-1">
          <ChevronRight size={20} />
        </button>
        {location.photo && location.photo[0]?.formats?.medium?.url ? (
          <Image src={location.photo[0].formats.medium.url} alt={location.title} fill className="object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${randomGradient} backdrop-blur-3xl`}>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
          </div>
        )}
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          className="absolute z-10 right-2 top-2 p-1.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-90"
        >
          <Heart
            className={liked ? "text-red-500 fill-current drop-shadow-lg" : "text-red-500/80 drop-shadow-lg"}
            fill={liked ? "currentColor" : "none"}
            size={20}
          />
        </button>
        <button className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-white/60 p-1 rounded-full transition-all duration-200 shadow hover:shadow-lg active:scale-90 active:-translate-x-1">
          <ChevronRight className="rotate-180" size={20} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold">{location.title}</h2>
        </div>
        <p className="text-gray-600 text-sm mt-1">{location.summary}</p>
          <div className="flex items-center justify-between mt-3">
              <button 
                className={`relative text-sm font-medium flex items-center px-4 py-2 rounded-xl transition-all duration-300
                hover:scale-105 active:scale-95
                hover:shadow-lg active:shadow-inner
                hover:bg-gray-50 active:bg-gray-100
                group`}
                onClick={handleRedirect}
                >
                <span className="relative z-10 flex items-center">
                  Подробнее
                  <ChevronRight className="inline ml-1 transition-transform duration-300 group-hover:translate-x-0.5" size={16} />
                </span>
              </button>
            <span className={`px-2 py-0.5 rounded-full text-xs border border-gray-300 hover:border-gray-400 transition-colors`}>
            {locationTypeMap[location.type] || location.type}
            </span>
          </div>
      </div>
    </div>
  );
}
