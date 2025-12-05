'use client'; // Добавьте эту строку в начало файла
import * as React from 'react';
import Script from 'next/script';
import {Map} from '@/components/Map/Map';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const apiUrl = `${process.env.NEXT_PUBLIC_MAP_API_URL}`;
  const searchParams = useSearchParams();
  
  // Получаем координаты из query параметров
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  
  // Формируем location для карты
  const mapLocation = React.useMemo(() => {
      console.log("lng: " + lng + " lat: " + lat);
      const longitude = parseFloat(lng!);
      const latitude = parseFloat(lat!);
        return {
          center: [longitude, latitude] as [number, number],
          zoom: 15 // Увеличенный zoom для конкретной локации
        };
  }, [lng, lat]);

  return (
    <>
      <Script src={apiUrl} strategy="afterInteractive"
        onLoad={() => console.log('✅ Yandex Maps script loaded successfully')}
        onError={(e) => console.error('❌ Failed to load Yandex Maps script:', e)}
        onReady={() => console.log(' Yandex Maps script is ready to use')} />
      <div style={{width: '100svw', height: '100svh'}}>
        <Map location={mapLocation} />
      </div>
    </>
  );
}
