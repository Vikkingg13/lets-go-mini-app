export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const cards = [
    {
      id: '1',
      title: 'Центральный Парк',
      description: 'Красивый городской парк в центре города',
      rating: 4.8,
      category: 'Парки',
      distance: '1.2 km',
      images: ['/placeholder.svg']
    },
    {
      id: '2',
      title: 'Музей Искусств',
      description: 'Интересный музей с разнообразными выставками',
      rating: 4.5,
      category: 'Музеи',
      distance: '2.5 km',
      images: ['/placeholder.svg']
    },
    {
      id: '3',
      title: 'Ресторан "Вкусно"',
      description: 'Отличное место для ужина с друзьями',
      rating: 4.7,
      category: 'Рестораны',
      distance: '500 m',
      images: ['/placeholder.svg']
    },
    {
      id: '4',
      title: 'Кинотеатр "Синема"',
      description: 'Современный кинотеатр с комфортными залами',
      rating: 4.6,
      category: 'Кинотеатры',
      distance: '1.8 km',
      images: ['/placeholder.svg']
    },
    {
      id: '5',
      title: 'Спортивный Комплекс',
      description: 'Место для занятий спортом и фитнесом',
      rating: 4.9,
      category: 'Спорт',
      distance: '3.0 km',
      images: ['/placeholder.svg']
    }
  ];
  return new Response(JSON.stringify(cards), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}