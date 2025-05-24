'use client'

import { useState } from "react";

export default function categories() {
  // ... existing state and hooks (t, activeTab, setActiveTab, search, setSearch, filteredLocations)

  // Состояние для активной категории
  const [activeCategory, setActiveCategory] = useState('Все');

  // Пример списка категорий (замените на свои фактические категории)
  const categories = ['Все', 'Новые', 'Популярные', 'Парки', 'Музеи', 'Кафе', 'Рестораны', 'Спорт'];

  // ... existing return statement
  return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}.{/* ... existing code ... */}
        {/* Search */}.{/* ... existing code ... */}

        {/* Горизонтальный список категорий */}
        <div className="px-4 pb-4 overflow-x-auto whitespace-nowrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                inline-block // Позволяет кнопкам быть в одной строке и иметь отступы
                px-4 py-2    // Внутренние отступы
                border       // Граница
                rounded-full // Полностью скругленные углы
                text-sm      // Маленький размер текста
                mr-2         // Отступ справа между кнопками
                ${activeCategory === category
                  ? 'bg-black text-white' // Активный стиль
                  : 'border-gray-300 text-gray-700'} // Неактивный стиль
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Список локаций */}.{/* ... existing code ... */}
      </div>
  );
}