import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';
import LoadScreen from '@/components/LoadScreen';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <I18nProvider>
          <Root>
            <Suspense fallback={<LoadScreen />}>
              {children}
              <BottomNavigation />
            </Suspense>
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}
