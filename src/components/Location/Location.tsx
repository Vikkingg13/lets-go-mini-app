import { Location as LocationType } from '@/types/Location';
import { ChevronRight, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLaunchParams } from '@telegram-apps/sdk-react';

import { locationTypeMap } from '@/constants/locationTypes';
import { connectFavoriteLocationToUser } from '@/services/UserService';

interface LocationProps {
  location: LocationType;
}

export function Location({ location }: LocationProps) {

  const launchParams = useLaunchParams();
  const userId = launchParams.tgWebAppData?.user?.id ?? 0;


  const [isFavorite, setIsFavorite] = useState(false)

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/${location.documentId}`);
  }

  const handleFavorite = () => {
    if (!isFavorite) {
      connectFavoriteLocationToUser(userId, location.documentId)
    }
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="border rounded-xl overflow-hidden text-black">
      
      <div className="relative h-40 bg-gray-200">
      {location.photo && location.photo.length > 1 &&
        <button className="absolute right-2 top-1/2 z-10 transform -translate-y-1/2 bg-white/60 p-1 rounded-full transition-all duration-200 shadow hover:shadow-lg active:scale-90 active:translate-x-1">
          <ChevronRight size={20} />
        </button>
      }
      {location.photo && location.photo[0]?.formats?.medium?.url ? (
        <>
          <Image src={location.photo[0].formats.medium.url} alt={location.title} fill className="object-cover" />
          <button
              onClick={handleFavorite}
              className={`absolute w-8 h-8 z-10 rounded-full right-2 top-1 flex items-center justify-center transition-colors ${
                isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-600 hover:bg-white"
              }`}>
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </>
        
      ) : (
        <div className={`w-full h-full bg-gradient-to-br backdrop-blur-3xl`}>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
        </div>
      )}
        
        {location.photo && location.photo.length > 1 &&
        <button className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-white/60 p-1 rounded-full transition-all duration-200 shadow hover:shadow-lg active:scale-90 active:-translate-x-1">
          <ChevronRight className="rotate-180" size={20} />
        </button>
        }
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
