'use client'; // Добавьте эту строку в начало файла
import * as React from 'react';
import Script from 'next/script';
import {Map} from '@/components/Map/Map';
import { MapProvider } from '@/providers/MapProvider';

export default function Home() {
  const apiUrl = `${process.env.NEXT_PUBLIC_MAP_API_URL}`;

  console.log("Map apiUrl: " + apiUrl);
  return (
    <>
      <Script src={apiUrl} strategy="afterInteractive"
        onLoad={() => console.log('✅ Yandex Maps script loaded successfully')}
        onError={(e) => console.error('❌ Failed to load Yandex Maps script:', e)}
        onReady={() => console.log('�� Yandex Maps script is ready to use')} />
      <div style={{width: '100svw', height: '100svh'}}>
        <Map />
      </div>
    </>
  );
}
