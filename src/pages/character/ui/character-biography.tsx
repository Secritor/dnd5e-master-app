import { useTranslation } from 'react-i18next';

import styles from './character-page.module.css';

const LOOKS = [
  'sheet.age',
  'sheet.height',
  'sheet.weight',
  'sheet.eyes',
  'sheet.skin',
  'sheet.hair',
] as const;

const STORIES = [
  { label: 'sheet.looks', rows: 4 },
  { label: 'sheet.story', rows: 8 },
  { label: 'sheet.allies', rows: 4 },
  { label: 'sheet.extra', rows: 4 },
  { label: 'sheet.treasure', rows: 3 },
] as const;

export function CharacterBiography() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.sheetGrid} ${styles.bioGrid}`}>
      <div className={`${styles.column} ${styles.columnTight}`}>
        <button type="button" className={styles.portrait}>
          <svg
            className={styles.portraitIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="m21 17-5-5-9 8" />
          </svg>
          {t('sheet.portrait')}
        </button>
        <div className={styles.looks}>
          {LOOKS.map((field) => (
            <label key={field} className={styles.lookField}>
              <span className={styles.lookCaption}>{t(field)}</span>
              <input className={styles.lookInput} />
            </label>
          ))}
        </div>
      </div>
      <div className={styles.bioStory}>
        {STORIES.map((story) => (
          <label key={story.label} className={styles.block}>
            <span className={styles.blockLabel}>{t(story.label)}</span>
            <textarea className={styles.area} rows={story.rows} />
          </label>
        ))}
      </div>
    </div>
  );
}
