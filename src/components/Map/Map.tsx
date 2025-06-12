'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ReactifiedModule} from '@yandex/ymaps3-types/reactify/reactify';

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
    <YMap location={{center: [37.588144, 55.733842], zoom: 9}}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
    </YMap>
  );
};

export default Map;
