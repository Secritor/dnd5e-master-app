import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui';

import styles from './home-hero.module.css';

export function HomeHero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.kicker}>{t('home.kicker')}</p>
        <h1 className={styles.title}>{t('home.heroTitle')}</h1>
        <p className={styles.text}>{t('home.heroText')}</p>
        <div className={styles.actions}>
          <Button variant="accent" to="/character">
            {t('home.createCharacter')}
          </Button>
          <Button variant="quiet" to="/company">
            {t('home.browseCampaigns')}
          </Button>
        </div>
      </div>
      <div className={styles.markWrap}>
        <HeroMark />
      </div>
    </section>
  );
}

function HeroMark() {
  return (
    <svg
      className={styles.mark}
      width="380"
      height="380"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="190" stroke="#3D362C" strokeWidth="1" />
      <circle cx="200" cy="200" r="150" stroke="#302A22" strokeWidth="1" />
      <g stroke="#D9A35B" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M200 40 339 120v160L200 360 61 280V120z" />
        <path d="M200 112 287 262H113z" />
        <path d="M200 40v72M339 120l-52 142M61 120l52 142M200 360l-87-98M200 360l87-98M339 280l-52-18M61 280l52-18M61 120l139-8M339 120l-139-8" />
      </g>
      <text
        x="200"
        y="222"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="56"
        fontWeight="600"
        fill="#D9A35B"
      >
        20
      </text>
    </svg>
  );
}
