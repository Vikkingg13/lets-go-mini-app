'use client'

import { Location as LocationType } from '@/types/Location';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react'; // Убедитесь, что у вас установлен пакет lucide-react
import Image from 'next/image';
import React, { useState } from 'react';
import { Page } from '../Page';

import { badgeColors } from '@/constants/badgeColors';

import { locationTypeMap } from '@/constants/locationTypes';

interface LocationDetailProps {
  location: LocationType;
}

export default function LocationDetails({ location }: LocationDetailProps) {
  // Здесь можно добавить состояние для текущего изображения карусели, если их несколько
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

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

  const [randomColor] = useState(() =>
    badgeColors[Math.floor(Math.random() * badgeColors.length)]
  );

  return (
    <Page back={true}>
    <div className="container mx-auto max-w-md bg-whiterounded-lg overflow-hidden my-4">
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
           {location.type && (
             <span className={`${randomColor} inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700`}>
                {locationTypeMap[location.type] || location.type}
                {/* Замените на location.category или map теги */}
             </span>
           )}
           {/* Добавьте другие теги, если есть */}
           {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
             Москва // Пример дополнительного тега
           </span> */}
         </div>


        {/* Описание */}
        <p className="text-gray-600 text-sm mb-4">{location.description}</p>

        {/* Адрес и расстояние */}
        {/* Заглушка для адреса и расстояния, если их нет в LocationType */}
        {/* Если у вас есть поле address, используйте его */}
        <div>
          <div className="flex items-center text-gray-700">
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