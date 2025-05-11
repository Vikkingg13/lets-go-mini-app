'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { ChevronRight, Globe, MapPin, Search, SlidersHorizontal, Star } from "lucide-react"

import { Card as CardType } from '@/types/CardType'
import { Card } from '@/components/Card/Card';
import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import { List, Navigation } from '@telegram-apps/telegram-ui';



export default function Home() {

  const [cards, setCards] = useState<CardType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations('i18n');

  const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/locations') // или ваш API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch cards')
        }
        const data = await response.json()
        setCards(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  return (
    <Page back={false}>
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black">Исследуй Город</h1>
        <div className="flex gap-2">
          <button className="border rounded-full px-3 py-1.5 flex items-center gap-1 text-sm">
            <Globe size={16} />
            <span>RU</span>
          </button>
          <button className="border rounded-full px-3 py-1.5 flex items-center gap-1 text-sm">
            <span>Москва</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </header>
      
      {/* Search */}
      <div className="px-4 pb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Поиск мест..."
            className="w-full pl-10 pr-3 py-3 border rounded-full text-sm"
          />
        </div>
        <button className="p-3 border rounded-full">
          <SlidersHorizontal size={18} />
        </button>
      </div>

        <div className="flex-1 overflow-auto pb-16">
        <div className="p-4 space-y-4">
          {loading ? (
            <div className="text-center py-4">Загрузка...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <List>
                {cards.map(card => (
                <Card key={card.id} card={card} />))}
            </List>
          )}
        </div>
      </div>
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Page>
  );
}
