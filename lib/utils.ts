export function formatDateTime(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('sk-SK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function formatEventDateRange(startValue: string, endValue?: string | null) {
  if (!endValue) {
    return formatDateTime(startValue);
  }

  const start = new Date(startValue);
  const end = new Date(endValue);
  const sameDay = start.toDateString() === end.toDateString();
  const dateFormatter = new Intl.DateTimeFormat('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeFormatter = new Intl.DateTimeFormat('sk-SK', {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (sameDay) {
    return `${dateFormatter.format(start)}, ${timeFormatter.format(start)} - ${timeFormatter.format(end)}`;
  }

  return `${dateFormatter.format(start)} - ${dateFormatter.format(end)}`;
}

export function toSlug(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
