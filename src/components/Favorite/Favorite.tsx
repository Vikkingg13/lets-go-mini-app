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



export default function Favorite({ locations }: { locations: LocationType[] }) {

  const t = useTranslations('i18n');


  return (
    <Page back={false}>
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className='fixed top-0 left-0 right-0 z-50 bg-white'>
      <header className="p-2 text-black flex justify-between items-center">
        <h1 className="text-xl font-bold">Избранное</h1>
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
      

      {/* Locations */ }
        <div className="flex-1 overflow-auto">
          <div className="pt-16 p-4 space-y-4">
            <List>
              {Array.isArray(locations) && locations.map(location => (
                <Location key={location.id} location={location} disableFavorite={true} />
              ))}
            </List>
          </div>
        </div>
      </div>
    </Page>
  );
}
