'use client';

import {
  YMap
} from "@yandex/ymaps3-types/imperative/YMap";
import React, { useRef } from "react";
import { useMap } from "@/providers/MapProvider";


export const Map = () => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null);


  const { reactifyApi } = useMap();


  if (!reactifyApi) {
    return <div>Загрузка карты...</div>; // или другой компонент загрузки
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
  } = reactifyApi;
  

  return (
    <YMap margin={[20, 20, 20, 20]}  location={{ center: [55.751574, 37.573856] }}  ref={mapRef}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
    </YMap>
  );
};