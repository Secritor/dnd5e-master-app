import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './character-page.module.css';

const ABILITIES = [
  { name: 'sheet.str', code: 'sheet.strCode', skills: ['sheet.athletics'] },
  {
    name: 'sheet.dex',
    code: 'sheet.dexCode',
    skills: ['sheet.acrobatics', 'sheet.sleight', 'sheet.stealth'],
  },
  { name: 'sheet.con', code: 'sheet.conCode', skills: [] },
  {
    name: 'sheet.intFull',
    code: 'sheet.intCode',
    skills: [
      'sheet.investigation',
      'sheet.history',
      'sheet.arcana',
      'sheet.nature',
      'sheet.religion',
    ],
  },
  {
    name: 'sheet.wisFull',
    code: 'sheet.wisCode',
    skills: [
      'sheet.perception',
      'sheet.survival',
      'sheet.medicine',
      'sheet.insight',
      'sheet.animals',
    ],
  },
  {
    name: 'sheet.chaFull',
    code: 'sheet.chaCode',
    skills: ['sheet.performance', 'sheet.intimidation', 'sheet.deception', 'sheet.persuasion'],
  },
] as const;

const TRAITS = [
  { label: 'sheet.traits', rows: 3 },
  { label: 'sheet.ideals', rows: 2 },
  { label: 'sheet.bonds', rows: 2 },
  { label: 'sheet.flaws', rows: 2 },
  { label: 'sheet.features', rows: 18 },
] as const;

const COINS = ['sheet.cp', 'sheet.sp', 'sheet.ep', 'sheet.gp', 'sheet.pp'] as const;

const INITIAL_ATTACKS = 3;

export function CharacterMain() {
  return (
    <div className={styles.sheetGrid}>
      <AbilityColumn />
      <CombatColumn />
      <TraitsColumn />
    </div>
  );
}

function AbilityColumn() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.column} ${styles.columnTight}`}>
      <div className={styles.pair}>
        <label className={styles.flag}>
          <input type="checkbox" className={styles.check} />
          {t('sheet.inspiration')}
        </label>
        <label className={styles.bonus}>
          <span>{t('sheet.proficiency')}</span>
          <input className={styles.bonusInput} placeholder={t('sheet.proficiencyPh')} />
        </label>
      </div>
      {ABILITIES.map((ability) => (
        <AbilityCard
          key={ability.name}
          name={t(ability.name)}
          code={t(ability.code)}
          skills={ability.skills.map((skill) => t(skill))}
        />
      ))}
      <label className={styles.bonus}>
        <span>{t('sheet.passive')}</span>
        <input className={styles.bonusInput} placeholder={t('sheet.scorePh')} />
      </label>
      <label className={styles.block}>
        <span className={styles.blockLabel}>{t('sheet.other')}</span>
        <textarea className={styles.area} rows={4} placeholder={t('sheet.otherPh')} />
      </label>
    </div>
  );
}

function AbilityCard({ name, code, skills }: { name: string; code: string; skills: string[] }) {
  const { t } = useTranslation();

  return (
    <div className={styles.ability} role="group" aria-label={name}>
      <div className={styles.abilityHead}>
        <div className={styles.abilityNames}>
          <span className={styles.abilityName}>{name}</span>
          <span className={styles.abilityCode}>{code}</span>
        </div>
        <input
          className={styles.score}
          inputMode="numeric"
          placeholder={t('sheet.scorePh')}
          aria-label={t('sheet.score', { name })}
        />
        <input
          className={styles.modifier}
          placeholder={t('sheet.plusZero')}
          aria-label={t('sheet.modifier', { name })}
        />
      </div>
      <div className={styles.abilityBody}>
        <div className={styles.skillRow}>
          <input
            className={styles.skillInput}
            placeholder={t('sheet.plusZero')}
            aria-label={t('sheet.saveOf', { name })}
          />
          <span className={styles.saveLabel}>{t('sheet.save')}</span>
        </div>
        {skills.map((skill) => (
          <div key={skill} className={styles.skillRow}>
            <input
              className={styles.skillInput}
              placeholder={t('sheet.plusZero')}
              aria-label={t('sheet.skillValue', { name: skill })}
            />
            <span className={styles.skillLabel}>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CombatColumn() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.column} ${styles.columnLoose}`}>
      <div className={styles.stats}>
        <label className={styles.stat}>
          <span className={styles.statLabel}>{t('sheet.ac')}</span>
          <input className={styles.statInput} placeholder={t('sheet.scorePh')} />
        </label>
        <label className={styles.stat}>
          <span className={styles.statLabel}>{t('sheet.init')}</span>
          <input className={styles.statInput} placeholder={t('sheet.plusZero')} />
        </label>
        <label className={styles.stat}>
          <span className={styles.statLabel}>{t('sheet.speed')}</span>
          <input
            className={`${styles.statInput} ${styles.statSpeed}`}
            placeholder={t('sheet.speedPh')}
          />
        </label>
      </div>
      <fieldset className={`${styles.panel} ${styles.hp}`}>
        <legend className={styles.legend}>{t('sheet.hp')}</legend>
        <label className={styles.hpField}>
          <span>{t('sheet.hpMax')}</span>
          <input className={styles.hpInput} placeholder={t('sheet.zero')} />
        </label>
        <label className={styles.hpField}>
          <span>{t('sheet.hpCur')}</span>
          <input
            className={`${styles.hpInput} ${styles.hpCurrent}`}
            placeholder={t('sheet.zero')}
          />
        </label>
        <label className={styles.hpField}>
          <span>{t('sheet.hpTemp')}</span>
          <input className={styles.hpInput} placeholder={t('sheet.zero')} />
        </label>
      </fieldset>
      <div className={styles.split}>
        <label className={styles.block}>
          <span className={styles.blockLabel}>{t('sheet.hitDie')}</span>
          <input className={styles.centerLarge} placeholder={t('sheet.hitDiePh')} />
        </label>
        <fieldset className={`${styles.panel} ${styles.death}`}>
          <legend className={styles.legend}>{t('sheet.death')}</legend>
          <div className={styles.deathRow}>
            <span>{t('sheet.successes')}</span>
            <span className={styles.deathChecks}>
              {[1, 2, 3].map((n) => (
                <input
                  key={n}
                  type="checkbox"
                  className={`${styles.check} ${styles.checkSuccess}`}
                  aria-label={t('sheet.successN', { n })}
                />
              ))}
            </span>
          </div>
          <div className={styles.deathRow}>
            <span>{t('sheet.failures')}</span>
            <span className={styles.deathChecks}>
              {[1, 2, 3].map((n) => (
                <input
                  key={n}
                  type="checkbox"
                  className={`${styles.check} ${styles.checkFailure}`}
                  aria-label={t('sheet.failureN', { n })}
                />
              ))}
            </span>
          </div>
        </fieldset>
      </div>
      <Attacks />
      <Gear />
    </div>
  );
}

function Attacks() {
  const { t } = useTranslation();
  const [rowCount, setRowCount] = useState<number>(INITIAL_ATTACKS);

  return (
    <fieldset className={`${styles.panel} ${styles.attacks}`}>
      <legend className={styles.legend}>{t('sheet.attacks')}</legend>
      <div className={`${styles.attackGrid} ${styles.attackHead}`}>
        <span>{t('sheet.atkName')}</span>
        <span>{t('sheet.atkBonus')}</span>
        <span>{t('sheet.atkDamage')}</span>
      </div>
      {Array.from({ length: rowCount }, (_, index) => {
        const n = index + 1;

        return (
          <div key={n} className={styles.attackGrid}>
            <input className={styles.lineInput} aria-label={t('sheet.atkNameN', { n })} />
            <input className={styles.lineInput} aria-label={t('sheet.atkBonusN', { n })} />
            <input className={styles.lineInput} aria-label={t('sheet.atkDamageN', { n })} />
          </div>
        );
      })}
      <button
        type="button"
        className={styles.addRow}
        onClick={() => setRowCount((count) => count + 1)}
      >
        {t('sheet.addAttack')}
      </button>
    </fieldset>
  );
}

function Gear() {
  const { t } = useTranslation();

  return (
    <fieldset className={`${styles.panel} ${styles.gear}`}>
      <legend className={styles.legend}>{t('sheet.gear')}</legend>
      <div className={styles.coins}>
        {COINS.map((coin) => (
          <label key={coin} className={styles.coin}>
            <span className={styles.coinLabel}>{t(coin)}</span>
            <input className={styles.coinInput} placeholder={t('sheet.zero')} />
          </label>
        ))}
      </div>
      <textarea
        className={styles.area}
        rows={8}
        placeholder={t('sheet.gearPh')}
        aria-label={t('sheet.gear')}
      />
    </fieldset>
  );
}

function TraitsColumn() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.column} ${styles.columnLoose}`}>
      {TRAITS.map((trait) => (
        <label key={trait.label} className={styles.block}>
          <span className={styles.blockLabel}>{t(trait.label)}</span>
          <textarea className={styles.area} rows={trait.rows} />
        </label>
      ))}
    </div>
  );
}
