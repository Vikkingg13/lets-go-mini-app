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
  const [isButtonActive, setIsButtonActive] = useState(false);

  const [randomColor] = useState(() =>
    badgeColors[Math.floor(Math.random() * badgeColors.length)]
  );

  const router = useRouter();

  const handleRedirect = () => {
    setIsButtonActive(true);
    setTimeout(() => {
      router.push(`/${location.documentId}`);
    }, 300);
  }

  return (
    <div className="border rounded-xl overflow-hidden text-black">
      <div className="relative h-40 bg-gray-200">
        <button className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 rounded-full transition-all duration-200 shadow hover:shadow-lg active:scale-90 active:-translate-x-1">
          <ChevronRight className="rotate-180" size={20} />
        </button>
        <Image src={location.photo[0].formats.medium.url}  alt={location.title} fill className="object-cover" />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 rounded-full transition-all duration-200 shadow hover:shadow-lg active:scale-90 active:translate-x-1">
          <ChevronRight size={20} />
        </button>

      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold">{location.title}</h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLiked((prev) => !prev)}
              className="focus:outline-none"
            >
              <Heart
                className={liked ? "text-red-500 fill-current" : "text-red-500"}
                fill={liked ? "currentColor" : "none"}
                size={24}
              />
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-1">{location.summary}</p>
          <div className="flex items-center justify-between mt-3">
              <button 
                className={`relative text-sm font-medium flex items-center px-4 py-2 rounded-xl transition-all duration-300
                  ${isButtonActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
                  before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500
                  before:opacity-0 before:transition-opacity before:duration-800
                  ${isButtonActive ? 'before:opacity-100 before:animate-pulse' : 'hover:before:opacity-30'}
                  after:absolute after:inset-[1px] after:rounded-xl after:bg-white
                  group`}
                onClick={handleRedirect}
                >
                <span className="relative z-10 flex items-center">
                  Подробнее
                  <ChevronRight className="inline ml-1 transition-transform duration-300 group-hover:translate-x-0.5" size={16} />
                </span>
              </button>
            <span className={`${randomColor} px-2 py-0.5 rounded-full text-xs`}>
            {locationTypeMap[location.type] || location.type}
            </span>
          </div>
      </div>
    </div>
  );
}
