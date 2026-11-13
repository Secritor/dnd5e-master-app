import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './character-page.module.css';

const INITIAL_SLOTS = [4, 3, 2, 1, 0, 0, 0, 0, 0];
const SLOT_MIN = 0;
const SLOT_MAX = 9;

const SPELLS = [
  {
    level: '0',
    name: 'sheet.fireBolt',
    time: 'sheet.oneAction',
    range: 'sheet.ft120',
    concentration: false,
    ritual: false,
    material: false,
  },
  {
    level: '1',
    name: 'sheet.detectMagic',
    time: 'sheet.oneAction',
    range: 'sheet.self',
    concentration: true,
    ritual: true,
    material: false,
  },
  {
    level: '1',
    name: 'sheet.shieldSpell',
    time: 'sheet.oneReaction',
    range: 'sheet.self',
    concentration: false,
    ritual: false,
    material: false,
  },
  {
    level: '3',
    name: 'sheet.fireball',
    time: 'sheet.oneAction',
    range: 'sheet.ft150',
    concentration: false,
    ritual: false,
    material: true,
  },
  null,
  null,
] as const;

const INITIAL_SPELLS = SPELLS.length;

export function CharacterSpells() {
  const { t } = useTranslation();
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [spellCount, setSpellCount] = useState<number>(INITIAL_SPELLS);

  const changeSlot = (levelIndex: number, delta: number) => {
    setSlots((current) =>
      current.map((count, index) => {
        if (index !== levelIndex) {
          return count;
        }

        return Math.min(SLOT_MAX, Math.max(SLOT_MIN, count + delta));
      })
    );
  };

  return (
    <div className={styles.spells}>
      <fieldset className={`${styles.panel} ${styles.spellStats}`}>
        <legend className={styles.legend}>{t('sheet.spellcasting')}</legend>
        <label className={styles.spellField}>
          <span className={styles.spellCaption}>{t('sheet.spellAbility')}</span>
          <select className={styles.select}>
            <option>{t('sheet.int')}</option>
            <option>{t('sheet.wis')}</option>
            <option>{t('sheet.cha')}</option>
          </select>
        </label>
        <label className={styles.spellField}>
          <span className={styles.spellCaption}>{t('sheet.spellMod')}</span>
          <input className={styles.spellMod} placeholder={t('sheet.spellModPh')} />
        </label>
        <label className={styles.spellField}>
          <span className={styles.spellCaption}>{t('sheet.spellDc')}</span>
          <input className={styles.spellDc} placeholder={t('sheet.spellDcPh')} />
        </label>
        <label className={styles.spellField}>
          <span className={styles.spellCaption}>{t('sheet.spellAttack')}</span>
          <input className={styles.spellDc} placeholder={t('sheet.spellAttackPh')} />
        </label>
      </fieldset>
      <fieldset className={`${styles.panel} ${styles.slots}`}>
        <legend className={styles.legend}>{t('sheet.slots')}</legend>
        <p className={styles.slotsHelp}>{t('sheet.slotsHelp')}</p>
        <div className={styles.slotGrid}>
          {slots.map((count, index) => {
            const level = index + 1;
            const levelLabel = t('sheet.slotLevel', { n: level });

            return (
              <div key={level} className={styles.slotCard}>
                <span className={styles.slotLevel}>{levelLabel}</span>
                <div className={styles.slotRow}>
                  <button
                    type="button"
                    className={styles.slotButton}
                    aria-label={t('sheet.slotDec', { level: levelLabel })}
                    onClick={() => changeSlot(index, -1)}
                  >
                    −
                  </button>
                  <span className={styles.slotCount}>{count}</span>
                  <button
                    type="button"
                    className={styles.slotButton}
                    aria-label={t('sheet.slotInc', { level: levelLabel })}
                    onClick={() => changeSlot(index, 1)}
                  >
                    +
                  </button>
                </div>
                <div className={styles.spent}>
                  {Array.from({ length: count }, (_, slotIndex) => (
                    <input
                      key={slotIndex}
                      type="checkbox"
                      className={styles.check}
                      aria-label={t('sheet.slotSpent', { level: levelLabel, n: slotIndex + 1 })}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
      <fieldset className={`${styles.panel} ${styles.spellList}`}>
        <legend className={styles.legend}>{t('sheet.spellList')}</legend>
        <div className={styles.tableScroll}>
          <div className={styles.table}>
            <div className={`${styles.spellGrid} ${styles.spellHead}`}>
              <span>{t('sheet.colLevel')}</span>
              <span>{t('sheet.colName')}</span>
              <span>{t('sheet.colTime')}</span>
              <span>{t('sheet.colRange')}</span>
              <abbr className={styles.abbr} title={t('sheet.conc')}>
                {t('sheet.abbrC')}
              </abbr>
              <abbr className={styles.abbr} title={t('sheet.ritual')}>
                {t('sheet.abbrR')}
              </abbr>
              <abbr className={styles.abbr} title={t('sheet.material')}>
                {t('sheet.abbrM')}
              </abbr>
            </div>
            {Array.from({ length: spellCount }, (_, index) => (
              <SpellRow key={index} index={index} />
            ))}
          </div>
        </div>
        <p className={styles.spellLegend}>{t('sheet.legend')}</p>
        <button
          type="button"
          className={styles.addRow}
          onClick={() => setSpellCount((count) => count + 1)}
        >
          {t('sheet.addSpell')}
        </button>
      </fieldset>
      <label className={`${styles.block} ${styles.notes}`}>
        <span className={styles.blockLabel}>{t('sheet.notes')}</span>
        <textarea className={styles.area} rows={6} placeholder={t('sheet.notesPh')} />
      </label>
    </div>
  );
}

function SpellRow({ index }: { index: number }) {
  const { t } = useTranslation();
  const seed = SPELLS[index];
  const n = index + 1;

  return (
    <div className={styles.spellGrid}>
      <input
        className={`${styles.lineInput} ${styles.centerInput}`}
        placeholder={t('sheet.levelPh')}
        defaultValue={seed?.level}
        aria-label={t('sheet.spellLevelN', { n })}
      />
      <input
        className={styles.lineInput}
        placeholder={t('sheet.nameSpellPh')}
        defaultValue={seed ? t(seed.name) : undefined}
        aria-label={t('sheet.spellNameN', { n })}
      />
      <input
        className={styles.lineInput}
        placeholder={t('sheet.timePh')}
        defaultValue={seed ? t(seed.time) : undefined}
        aria-label={t('sheet.spellTimeN', { n })}
      />
      <input
        className={styles.lineInput}
        placeholder={t('sheet.rangePh')}
        defaultValue={seed ? t(seed.range) : undefined}
        aria-label={t('sheet.spellRangeN', { n })}
      />
      <input
        type="checkbox"
        className={`${styles.check} ${styles.checkCell}`}
        defaultChecked={seed?.concentration ?? false}
        aria-label={t('sheet.concN', { n })}
      />
      <input
        type="checkbox"
        className={`${styles.check} ${styles.checkCell}`}
        defaultChecked={seed?.ritual ?? false}
        aria-label={t('sheet.ritualN', { n })}
      />
      <input
        type="checkbox"
        className={`${styles.check} ${styles.checkCell}`}
        defaultChecked={seed?.material ?? false}
        aria-label={t('sheet.materialN', { n })}
      />
    </div>
  );
}
