'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ReactifiedModule} from '@yandex/ymaps3-types/reactify/reactify';
import Script from 'next/script';
declare const ymaps3: any;

type ReactifiedApi = ReactifiedModule<typeof ymaps3>;

const Map = () => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();

  React.useEffect(() => {
    Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]).then(([{reactify}]) =>
      setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3))
    );
  }, []);

  if (!reactifiedApi) {
    return null;
  }

  const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = reactifiedApi;

  return (
    <>
        <Script src="https://api-maps.yandex.ru/v3/?apikey=1ed79f7f-17f8-4180-a55e-33f3de0353c7&lang=en_US" strategy="beforeInteractive" />
        <YMap location={{center: [37.588144, 55.733842], zoom: 9}}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
        </YMap>

    </>

  );
};

export default Map;
