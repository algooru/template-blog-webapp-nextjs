'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            <Image
              src="/assets/images/olyezy-logo.png"
              alt="Olyezy - A Different Light On Travel"
              width={200}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
