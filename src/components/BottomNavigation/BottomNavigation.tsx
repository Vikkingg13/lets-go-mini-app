"use client"

import { InlineButtons } from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { Map, MapPin, Search } from "lucide-react";
import { useRouter } from 'next/navigation';


interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {

  const router = useRouter();

  const goToMap = () => {
    router.push("/map");
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t z-50 ">
      <InlineButtons mode="plain" className="grid grid-cols-3 text-xs">
        <InlineButtonsItem
          text="Обзор"
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center py-3 ${activeTab === "overview" ? "text-black" : "text-gray-500"}`}
        >
          <Search className={activeTab === "overview" ? "fill-black" : ""} size={20} />
        </InlineButtonsItem>
        <InlineButtonsItem
          text="Карта"
          onClick={goToMap}
          className={`flex flex-col items-center py-3 ${activeTab === "search" ? "text-black" : "text-gray-500"}`}
        >
          <Map className={activeTab === "search" ? "fill-black" : ""} size={20} />
        </InlineButtonsItem>
        <InlineButtonsItem
          text="Избранное"
          onClick={() => setActiveTab("favorites")}
          className={`flex flex-col items-center py-3 ${activeTab === "favorites" ? "text-black" : "text-gray-500"}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={activeTab === "favorites" ? "fill-black" : ""}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </InlineButtonsItem>
      </InlineButtons>
    </div>
  );
}