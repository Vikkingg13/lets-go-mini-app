'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ReactifiedModule} from '@yandex/ymaps3-types/reactify/reactify';
import {LngLat, type YMapCenterLocation} from '@yandex/ymaps3-types';
import { Page } from '../Page';

type ReactifiedApi = ReactifiedModule<typeof ymaps3>;

interface MapProps {
  location?: YMapCenterLocation ;
}

export function Map({ location }: MapProps) {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();

  React.useEffect(() => {
    const waitForYmaps3 = () => {
      if (typeof window !== 'undefined' && (window as any).ymaps3) {
        const ymaps3 = (window as any).ymaps3;
        console.log('✅ ymaps3 found, initializing...');
        
        Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]).then(([{reactify}]) =>
          setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3))
        );
      } else {
        console.log('⏳ ymaps3 not ready, retrying in 100ms...');
        setTimeout(waitForYmaps3, 100);
      }
    };

    waitForYmaps3();
  }, []);

  if (!reactifiedApi || !location) {
    return <div>Loading map...</div>;
  }

  const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = reactifiedApi;

  return (
    <Page back={true}>
      <YMap location={location }>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapMarker coordinates={location.center}>
          <img 
            src="/yandex_marker.png" 
            alt="Marker"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '64px',
              maxHeight: '64px',
              pointerEvents: 'none'
            }}
          />
        </YMapMarker>
      </YMap>
    </Page>
  );
};