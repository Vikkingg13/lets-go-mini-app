'use client'

import { Location as LocationType } from '@/types/Location';
import { MapPin, Star, ChevronLeft, ChevronRight, XCircle, CheckCircle, Clock, Globe, MapIcon, Heart } from 'lucide-react'; // Убедитесь, что у вас установлен пакет lucide-react
import Image from 'next/image';
import React, { useState } from 'react';
import { Page } from '../Page';

import { badgeColors } from '@/constants/badgeColors';

import { locationTypeMap } from '@/constants/locationTypes';
import { Link } from '../Link/Link';

interface LocationDetailProps {
  location: LocationType;
}

export default function LocationDetails({ location }: LocationDetailProps) {
  // Здесь можно добавить состояние для текущего изображения карусели, если их несколько
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const [isFavorite, setIsFavorite] = useState(false)

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (location.photo?.length || 1) - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (location.photo?.length || 1) - 1 ? 0 : prevIndex + 1
    );
  };


  return (
    <Page back={true}>
    <div className="container pb-16 mx-auto max-w-md bg-whiterounded-lg overflow-hidden mb-4">
      {/* Секция с изображением (карусель) */}
      <div className="relative h-64 bg-gray-200">
        {location.photo && location.photo.length > 0 ? (
          <>
            <Image
              src={location.photo[currentImageIndex].formats.medium.url}
              alt={location.title}
              fill
              className="object-cover"
            />


          <div className="absolute top-4 right-4 flex gap-2">   
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-600 hover:bg-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>
            {/* Кнопки навигации по изображению */}
            {location.photo.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            {/* Точки пагинации */}
            {location.photo.length > 1 && (
               <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                 {location.photo.map((_, index) => (
                   <span
                     key={index}
                     className={`block w-2 h-2 rounded-full mx-1 ${
                       index === currentImageIndex ? 'bg-black' : 'bg-gray-400'
                     }`}
                   ></span>
                 ))}
               </div>
            )}
          </>
        ) : (
          // Заглушка, если нет фотографий
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            Нет фото
          </div>
        )}
      </div>

      {/* Информация о локации */}
      <div className="p-4">
        {/* Название и рейтинг */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-gray-900">{location.title}</h1>
        </div>

        {/* Категории/Теги */}
        {/* Если у вас есть массив тегов или категорий в LocationType, отобразите их */}
        {/* Ниже пример для отображения типа локации как тега */}
         <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center border rounded-full px-2">
              <span className="text-sm text-gray-500">{locationTypeMap[location.type] || location.type}</span>
            </div>
             <div className="flex items-center">
              <MapIcon className="w-3 h-3 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">Москва</span>
            </div>

           {/* Добавьте другие теги, если есть */}
           {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
             Москва // Пример дополнительного тега
           </span> */}
         </div>

        {/* Описание */}
        <p className="text-gray-600 text-sm mb-4">{location.description}</p>
        
        <div>
          <div className="flex items-center text-gray-700">
            <Clock size={18} className="mr-2" />
            <span className="font-semibold">Время работы</span>
          </div>
          <p className="text-gray-600 text-sm ml-6">
            {location.work_time}
          </p>
        </div>

        <div>
          <div className="flex items-center text-gray-700 mt-4">
            <Globe size={18} className="mr-2" />
            <span className="font-semibold">Сайт</span>
          </div>
          <p className="text-gray-600 text-sm ml-6">
            <Link href={location.link} className="text-blue-600 text-sm hover:underline">{location.link}</Link>
          </p>
        </div>

        <div>
          <div className="flex items-center text-gray-700 mt-4">
            <MapPin size={18} className="mr-2" />
            <span className="font-semibold">Адрес</span>
          </div>
          <p className="text-gray-600 text-sm ml-6">
            {location.address} {/* Замените на location.address, если доступно */}
          </p>
        </div>
        {/* Здесь можно добавить другие детали, кнопки действий и т.д. */}
      </div>
    </div>
    </Page>
  );
}