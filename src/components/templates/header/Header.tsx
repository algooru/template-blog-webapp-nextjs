'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import OlyezyLogo from '@icons/olyezy-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            <OlyezyLogo className="h-10 w-auto" />
          </Link>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
