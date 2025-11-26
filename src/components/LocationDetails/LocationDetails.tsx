'use client'

import { Location as LocationType } from '@/types/Location';
import { MapPin, Star, ChevronLeft, ChevronRight, XCircle, CheckCircle, Clock, Globe, MapIcon, Heart, Share2, Phone, Mail, Navigation, ChevronDown, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../Page';

import { badgeColors } from '@/constants/badgeColors';
import { locationTypeMap } from '@/constants/locationTypes';
import { Link } from '../Link/Link';

interface LocationDetailProps {
  location: LocationType;
}

const staticMapApiUrl = process.env.NEXT_PUBLIC_STATIC_MAP_API_URL;

const DESCRIPTION_MAX_LINES = 4; // Количество строк до обрезки

export default function LocationDetails({ location }: LocationDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (location.photo?.length || 1) - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (location.photo?.length || 1) - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Обработка свайпа
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && location.photo && location.photo.length > 1) {
      handleNextImage();
    }
    if (isRightSwipe && location.photo && location.photo.length > 1) {
      handlePrevImage();
    }
  };

  // Автопрокрутка (опционально)
  useEffect(() => {
    if (location.photo && location.photo.length > 1) {
      const interval = setInterval(() => {
        // Раскомментируйте для автопрокрутки
        // handleNextImage();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentImageIndex, location.photo]);


  return (
    <Page back={true}>
      <div className="container mx-auto max-w-md bg-white rounded-lg overflow-hidden mb-4 shadow-sm">
        {/* Секция с изображением (слайдер) */}
        <div 
          ref={sliderRef}
          className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {location.photo && location.photo.length > 0 ? (
            <div className="relative w-full h-full">
              {/* Контейнер для всех изображений */}
              <div 
                className="flex h-full transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                  width: `${(location.photo?.length || 1) * 100}%`
                }}
              >
                {location.photo.map((photo, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-full h-full"
                    style={{ width: `${100 / (location.photo?.length || 1)}%` }}
                  >
                    <Image
                      src={photo.formats.medium.url}
                      alt={`${location.title} - фото ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 flex gap-2 z-20">   
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
                    isFavorite 
                      ? "bg-red-500 text-white scale-110" 
                      : "bg-white/90 text-gray-600 hover:bg-white hover:scale-105"
                  }`}
                  aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                >
                  <Heart className={`w-5 h-5 transition-all ${isFavorite ? "fill-current scale-110" : ""}`} />
                </button>
              </div>

              {location.photo.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg z-20 hover:bg-white hover:scale-110 transition-all duration-200 active:scale-95"
                    onClick={handlePrevImage}
                    aria-label="Предыдущее фото"
                  >
                    <ChevronLeft size={22} className="text-gray-800" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg z-20 hover:bg-white hover:scale-110 transition-all duration-200 active:scale-95"
                    onClick={handleNextImage}
                    aria-label="Следующее фото"
                  >
                    <ChevronRight size={22} className="text-gray-800" />
                  </button>
                </>
              )}

              {location.photo.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 gap-1.5">
                  {location.photo.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isTransitioning) {
                          setIsTransitioning(true);
                          setCurrentImageIndex(index);
                          setTimeout(() => setIsTransitioning(false), 300);
                        }
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentImageIndex 
                          ? 'w-2.5 h-2.5 bg-white shadow-md' 
                          : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`Фото ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Нет фото</p>
              </div>
            </div>
          )}
        </div>

        {/* Галерея миниатюр */}
        {location.photo && location.photo.length > 1 && (
          <div className="px-5 pt-4 pb-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {location.photo.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? 'border-blue-500 scale-105' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={photo.formats.medium.url}
                    alt={`${location.title} - фото ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Информация о локации */}
        <div className="p-5 space-y-5">
          {/* Название и статус */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight flex-1">{location.title}</h1>
              {location.work_time && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-green-700">Открыто</span>
                </div>
              )}
            </div>
            
            {/* Категории/Теги */}
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-700">
                  {locationTypeMap[location.type] || location.type}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapIcon className="w-4 h-4 mr-1.5" />
                <span className="text-sm">Москва</span>
              </div>
            </div>
          </div>

          {/* Краткое описание */}
          {location.summary && (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
              <p className="text-gray-800 font-medium leading-relaxed text-sm">{location.summary}</p>
            </div>
          )}

          {/* Описание локации */}
          {location.description && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {location.description}
              </p>
            </div>
          )}

        

          {/* Кнопки действий */}
          <div className="space-y-3 pt-2">
          {location.address && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100/50 transition-colors">
              <div className="flex items-center text-gray-800 mb-2">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <span className="font-semibold text-base">Адрес</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {location.address}
              </p>

              {staticMapApiUrl && (
                <div className="rounded-lg overflow-hidden border border-gray-200 mt-3">
                  <Image
                    src={staticMapApiUrl}
                    alt={`Карта: ${location.address}`}
                    width={600}
                    height={300}
                    className="w-full h-auto object-cover"
                    unoptimized={true}
                  />
                </div>
              )}
            </div>
          )}

          {/* Информационные блоки */}
          <div className="space-y-4">
            {location.work_time && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center text-gray-800 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <Clock size={18} className="text-blue-600" />
                  </div>
                  <span className="font-semibold text-base">Время работы</span>
                </div>
                <p className="text-gray-700 text-sm ml-12">
                  {location.work_time}
                </p>
              </div>
            )}
          </div>

          {location.link && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100/50 transition-colors">
              <Link 
                href={location.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-800"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <Globe size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base text-gray-900">Сайт</span>
                    <ExternalLink size={16} className="text-gray-600 flex-shrink-0" />
                  </div>
                  <p className="text-gray-700 text-sm truncate">
                    {location.link.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}
                  </p>
                </div>
              </Link>
            </div>
          )}
            
          </div>
        </div>
      </div>
    </Page>
  );
}