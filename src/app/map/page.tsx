import * as React from 'react';
import Script from 'next/script';
import {Map} from '@/components/Map/Map';
import { MapProvider } from '@/providers/MapProvider';

export default function Home() {
  const apiUrl = `${process.env.MAP_API_URL}`;

  console.log(apiUrl);
  return (
    <MapProvider apiUrl={apiUrl}>
      <Map />
  </MapProvider>
  );
}
