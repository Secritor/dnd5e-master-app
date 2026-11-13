import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LanguageSwitcher } from '@/features/language-switcher';

import { CharacterBiography } from './character-biography';
import { CharacterMain } from './character-main';
import { CharacterSpells } from './character-spells';

import styles from './character-page.module.css';

const TABS = [
  { id: 'main', label: 'sheet.tabMain' },
  { id: 'bio', label: 'sheet.tabBio' },
  { id: 'spells', label: 'sheet.tabSpells' },
] as const;

type SheetTab = (typeof TABS)[number]['id'];

const BASICS = [
  { label: 'sheet.classLevel', placeholder: 'sheet.classLevelPh' },
  { label: 'sheet.background', placeholder: 'sheet.backgroundPh' },
  { label: 'sheet.player', placeholder: '' },
  { label: 'sheet.ancestry', placeholder: 'sheet.ancestryPh' },
  { label: 'sheet.alignment', placeholder: 'sheet.alignmentPh' },
  { label: 'sheet.xp', placeholder: 'sheet.xpPh' },
] as const;

export function CharacterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const baseId = useId();
  const [tab, setTab] = useState<SheetTab>('main');

  const handleBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;

    if (idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.headerStart}>
            <button type="button" className={styles.back} onClick={handleBack}>
              {t('sheet.back')}
            </button>
            <h1 className={styles.sheetTitle}>{t('sheet.new')}</h1>
          </div>
          <div className={styles.headerEnd}>
            <LanguageSwitcher placement="inline" />
            <button type="button" className={styles.quiet}>
              {t('sheet.saveDraft')}
            </button>
            <button type="button" className={styles.create}>
              {t('sheet.create')}
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.basics} aria-label={t('sheet.basics')}>
          <label className={styles.nameField}>
            <span className={styles.nameCaption}>{t('sheet.name')}</span>
            <input className={styles.nameInput} placeholder={t('sheet.namePh')} />
          </label>
          <div className={styles.basicsGrid}>
            {BASICS.map((field) => (
              <label key={field.label} className={styles.shortField}>
                <span className={styles.shortCaption}>{t(field.label)}</span>
                <input
                  className={styles.shortInput}
                  placeholder={field.placeholder ? t(field.placeholder) : undefined}
                />
              </label>
            ))}
          </div>
        </section>
        <div className={styles.tabs} role="tablist" aria-label={t('sheet.tabs')}>
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-${item.id}-tab`}
              className={styles.tab}
              aria-selected={tab === item.id}
              aria-controls={`${baseId}-${item.id}-panel`}
              onClick={() => setTab(item.id)}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${baseId}-main-panel`}
          aria-labelledby={`${baseId}-main-tab`}
          hidden={tab !== 'main'}
        >
          <CharacterMain />
        </div>
        <div
          role="tabpanel"
          id={`${baseId}-bio-panel`}
          aria-labelledby={`${baseId}-bio-tab`}
          hidden={tab !== 'bio'}
        >
          <CharacterBiography />
        </div>
        <div
          role="tabpanel"
          id={`${baseId}-spells-panel`}
          aria-labelledby={`${baseId}-spells-tab`}
          hidden={tab !== 'spells'}
        >
          <CharacterSpells />
        </div>
      </main>
    </div>
  );
}
