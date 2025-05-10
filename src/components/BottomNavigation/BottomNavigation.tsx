"use client"

import Link from "next/link"
import { MapPin, Search } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  return (
    <nav className="border-t grid grid-cols-4 text-xs bg-white">
      <Link
        href="#"
        className={`flex flex-col items-center py-3 ${activeTab === "overview" ? "text-black" : "text-gray-500"}`}
        onClick={() => setActiveTab("overview")}
      >
        <MapPin className={activeTab === "overview" ? "fill-black" : ""} size={20} />
        <span className="mt-1">Обзор</span>
      </Link>
      <Link
        href="#"
        className={`flex flex-col items-center py-3 ${activeTab === "favorites" ? "text-black" : "text-gray-500"}`}
        onClick={() => setActiveTab("favorites")}
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
        <span className="mt-1">Избранное</span>
      </Link>
      <Link
        href="#"
        className={`flex flex-col items-center py-3 ${activeTab === "search" ? "text-black" : "text-gray-500"}`}
        onClick={() => setActiveTab("search")}
      >
        <Search className={activeTab === "search" ? "fill-black" : ""} size={20} />
        <span className="mt-1">Поиск</span>
      </Link>
      <Link
        href="#"
        className={`flex flex-col items-center py-3 ${activeTab === "profile" ? "text-black" : "text-gray-500"}`}
        onClick={() => setActiveTab("profile")}
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
          className={activeTab === "profile" ? "fill-black" : ""}
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
        <span className="mt-1">Профиль</span>
      </Link>
    </nav>
  )
}