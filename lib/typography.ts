const SINGLE_LETTER_WORDS = /(^|[\s([{"„])([AaIiKkOoSsUuVvZz])\s+/g;

export function nbsp(text: string) {
  return text.replace(SINGLE_LETTER_WORDS, '$1$2\u00A0');
}

export function upcomingEventsLabel(count: number) {
  return `${count} ${count > 0 && count < 5 ? 'nadchádzajúce' : 'nadchádzajúcich'}`;
}
