import { useRef } from 'react';
import { Heading } from 'react-aria-components';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui';

import { digitsAfterEntry, digitsAfterPaste } from '../model/auth-code';

import styles from './master-auth-modal.module.css';

interface AuthCodeStepProps {
  email: string;
  digits: string[];
  onDigitsChange: (digits: string[]) => void;
  onChangeEmail: () => void;
  onSubmit: () => void;
}

export function AuthCodeStep({
  email,
  digits,
  onDigitsChange,
  onChangeEmail,
  onSubmit,
}: AuthCodeStepProps) {
  const { t } = useTranslation();
  const cellsRef = useRef<Array<HTMLInputElement | null>>([]);
  const shownEmail = email.length > 0 ? email : t('auth.emailFallback');

  const focusCell = (index: number) => {
    cellsRef.current[index]?.focus();
  };

  return (
    <div className={styles.step}>
      <div className={styles.intro}>
        <Heading slot="title" level={2} className={styles.title}>
          {t('auth.codeTitle')}
        </Heading>
        <p className={styles.lead}>
          {t('auth.codeSent', { email: shownEmail })}{' '}
          <button type="button" className={styles.changeEmail} onClick={onChangeEmail}>
            {t('auth.changeEmail')}
          </button>
        </p>
      </div>

      <fieldset className={styles.codeFields}>
        <legend className={styles.srOnly}>{t('auth.codeLegend')}</legend>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              cellsRef.current[index] = node;
            }}
            className={styles.digit}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete="off"
            aria-label={t('auth.digit', { n: index + 1 })}
            value={digit}
            onChange={(event) => {
              const next = digitsAfterEntry(digits, index, event.target.value);

              onDigitsChange(next.digits);

              if (next.focus !== index) focusCell(next.focus);
            }}
            onKeyDown={(event) => {
              if (event.key !== 'Backspace' || digit !== '' || index === 0) return;

              event.preventDefault();
              focusCell(index - 1);
            }}
            onPaste={(event) => {
              const text = event.clipboardData.getData('text');

              if (!/\d/.test(text)) return;

              event.preventDefault();
              const next = digitsAfterPaste(digits, index, text);

              onDigitsChange(next.digits);
              focusCell(next.focus);
            }}
          />
        ))}
      </fieldset>

      <Button variant="accent" fullWidth onPress={onSubmit}>
        {t('auth.submit')}
      </Button>
      <p className={styles.resend}>{t('auth.resend')}</p>
    </div>
  );
}
