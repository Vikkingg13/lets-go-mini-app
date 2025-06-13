"use client"

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { InlineButtons } from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { Heart, Map, MapPin, Search } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function BottomNavigation() {
  const launchParams = useLaunchParams();
  const userId = launchParams.tgWebAppData?.user?.id ?? 0;
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Здесь можно добавить навигацию
    switch(tab) {
      case 'overview':
        router.push('/');
        break;
      case 'map':
        router.push('/map');
        break;
      case 'favorite':
        router.push(`/favorite/${userId}`);
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t z-50 ">

      <InlineButtons mode="plain" className="grid grid-cols-3 text-xs">
        <InlineButtonsItem
          text="Обзор"
          onClick={() => handleTabChange('overview')}
          className={`flex flex-col items-center py-3 ${activeTab === "overview" ? "text-black" : "text-gray-500"}`}
        >
          <Search className={activeTab === "overview" ? "fill-black" : ""} size={20} />
        </InlineButtonsItem>

        <InlineButtonsItem
          text="Карта"
          onClick={() => handleTabChange('map')}
          className={`flex flex-col items-center py-3 ${activeTab === "search" ? "text-black" : "text-gray-500"}`}
        >
          <Map className={activeTab === "search" ? "fill-black" : ""} size={20} />
        </InlineButtonsItem>

        <InlineButtonsItem
          text="Избранное"
          onClick={() => handleTabChange('favorite')}
          className={`flex flex-col items-center py-3 ${activeTab === "favorite" ? "text-black" : "text-gray-500"}`}
        >
        <Heart className={`w-5 h-5 ${activeTab === "favorite" ? "fill-current" : ""}`} />
        </InlineButtonsItem>
      </InlineButtons>
    </div>
  );
}