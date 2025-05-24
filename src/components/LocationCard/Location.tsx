import { Location as LocationType } from '@/types/Location';
import { ChevronRight, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LocationProps {
  location: LocationType;
}

export function Location({ location }: LocationProps) {

  const [liked, setLiked] = useState(false);

  const badgeColors = [
  "bg-orange-100 text-orange-800",
  "bg-green-100 text-green-800",
  "bg-blue-100 text-blue-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  ];

  const [randomColor] = useState(() =>
    badgeColors[Math.floor(Math.random() * badgeColors.length)]
  );

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/${location.documentId}`);
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
        <p className="text-gray-600 text-sm mt-1">{location.description}</p>
<div className="flex items-center justify-between mt-3">
    <button 
      className="text-sm font-medium flex items-center"
      onClick={handleRedirect}
      >
    Подробнее
    <ChevronRight className="inline ml-1" size={16} />
  </button>
  <span className={`${randomColor} px-2 py-0.5 rounded-full text-xs`}>
    {location.type}
  </span>
</div>
      </div>
    </div>
  );
}
