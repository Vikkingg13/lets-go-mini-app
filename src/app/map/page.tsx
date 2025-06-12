import * as React from 'react';
import Script from 'next/script';
import Map from '@/components/Map/Map';

export default function Home() {
  return (
    <>
      <Script src="https://api-maps.yandex.ru/v3/?apikey=59a2183f-b353-43a5-9421-45c6a84f7395
&lang=en_US" strategy="beforeInteractive" />
      <div style={{width: '100svw', height: '100svh'}}>
        <Map />
      </div>
    </>
  );
}
