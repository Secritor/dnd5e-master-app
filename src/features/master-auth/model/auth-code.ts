const CODE_LENGTH = 6;

export function emptyCode(): string[] {
  return Array.from({ length: CODE_LENGTH }, () => '');
}

export function digitsAfterEntry(
  current: readonly string[],
  index: number,
  raw: string
): { digits: string[]; focus: number } {
  const digit = raw.replace(/\D/g, '').slice(-1);
  const digits = current.map((value, cell) => (cell === index ? digit : value));

  if (!digit) return { digits, focus: index };

  const nextEmpty = digits.findIndex((value, cell) => cell > index && value === '');

  return { digits, focus: nextEmpty === -1 ? index : nextEmpty };
}

export function digitsAfterPaste(
  current: readonly string[],
  index: number,
  text: string
): { digits: string[]; focus: number } {
  const clean = text.replace(/\D/g, '');

  if (!clean) return { digits: [...current], focus: index };

  if (clean.length >= CODE_LENGTH) {
    return { digits: clean.slice(0, CODE_LENGTH).split(''), focus: CODE_LENGTH - 1 };
  }

  const digits = [...current];
  const room = CODE_LENGTH - index;
  const chunk = clean.slice(0, room);

  for (let offset = 0; offset < chunk.length; offset += 1) {
    digits[index + offset] = chunk[offset] ?? '';
  }

  return { digits, focus: Math.min(index + chunk.length, CODE_LENGTH - 1) };
}
