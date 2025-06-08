'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { ChevronRight, Globe, MapPin, Search, SlidersHorizontal, Star } from "lucide-react"
import { List } from '@telegram-apps/telegram-ui';

import { Location as LocationType } from '@/types/Location';
import { locationTypeMap } from '@/constants/locationTypes';
import { Location } from '@/components/Location/Location';
import { LocationService } from '@/services/LocationService';
import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';



export default function Main({ locations }: { locations: LocationType[] }) {

  const t = useTranslations('i18n');

  const [activeTab, setActiveTab] = useState("overview")

  const [search, setSearch] = useState('');

  const [activeCategory, setActiveCategory] = useState('all');

  // Изменим фильтрацию, добавив проверку категории
const filteredLocations = locations.filter(location => {
  const matchesSearch = location.title.toLowerCase().includes(search.toLowerCase());
  const matchesCategory =  'all' === activeCategory || location.type === activeCategory;
  return matchesSearch && matchesCategory;
});

  // Пример списка категорий (замените на свои фактические категории)
  const categories = ['all', 'сulture', 'food', 'nature', 'landmark', 'activity'];

  return (
    <Page back={false}>
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className='fixed top-0 left-0 right-0 z-50 bg-white'>
      <header className="p-2 text-black flex justify-between items-center">
        <h1 className="text-xl font-bold">Исследуй Город</h1>
        <div className="flex gap-2">
        <button className="border rounded-full px-3 py-1.5 flex items-center gap-1 text-sm">
            <span>Москва</span>
            <ChevronRight size={16} />
          </button>
          <button className="border rounded-full px-3 py-1.5 flex items-center gap-1 text-sm">
            <Globe size={16} />
            <span>RU</span>
          </button>
        </div>
      </header>
      </div>
      
      {/* Search */}
      <div className="pt-16 px-4 pb-4 flex gap-2 text-black">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Поиск мест..."
              className="w-full pl-10 pr-3 py-3 border rounded-xl text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
        </div>
      </div>
        {/* Горизонтальный список категорий */}
        <div className="px-4 overflow-x-auto whitespace-nowrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                inline-block // Позволяет кнопкам быть в одной строке и иметь отступы
                px-2 py-1    // Внутренние отступы
                border       // Граница
                rounded-full // Полностью скругленные углы
                text-xs      // Маленький размер текста
                mr-2         // Отступ справа между кнопками
                ${activeCategory === category
                  ? 'bg-black text-white' // Активный стиль
                  : 'border-gray-300 text-gray-700'} // Неактивный стиль
              `}
            >
              {locationTypeMap[category]}
            </button>
          ))}
        </div>

      {/* Locations */ }
        <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">

          <List>
            {Array.isArray(filteredLocations) && filteredLocations.map(location => (
              <Location key={location.id} location={location} />
            ))}
          </List>
          
        </div>
      </div>
      <div className="pb-16">
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      </div>
    </Page>
  );
}
