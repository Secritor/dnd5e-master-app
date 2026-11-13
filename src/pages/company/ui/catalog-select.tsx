import { CheckIcon, ChevronIcon } from './catalog-icons';

import styles from './catalog-select.module.css';

interface CatalogOption<T extends string | number> {
  id: T;
  label: string;
}

interface CatalogSelectProps<T extends string | number> {
  listId: string;
  label: string;
  selectedText: string | null;
  open: boolean;
  options: CatalogOption<T>[];
  value: T | null;
  onToggle: () => void;
  onSelect: (id: T) => void;
}

export function CatalogSelect<T extends string | number>({
  listId,
  label,
  selectedText,
  open,
  options,
  value,
  onToggle,
  onSelect,
}: CatalogSelectProps<T>) {
  const selected = value !== null;

  return (
    <div className={styles.select}>
      <button
        type="button"
        className={selected ? styles.triggerOn : styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={onToggle}
      >
        {selectedText ?? label}
        <ChevronIcon className={styles.chevron} />
      </button>
      {open && (
        <div className={styles.panel} id={listId} role="listbox" aria-label={label}>
          {options.map((option) => (
            <SelectOption
              key={String(option.id)}
              label={option.label}
              selected={option.id === value}
              onSelect={() => onSelect(option.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SelectOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      className={styles.option}
      aria-selected={selected}
      onClick={onSelect}
    >
      <span>{label}</span>
      {selected && <CheckIcon />}
    </button>
  );
}
