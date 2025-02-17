export function dateBr(date: string | null) {
  if (!date) {
    return '';
  }

  if (!date.length) {
    return '';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour12: false,
  }).format(new Date(date));
}

type DateTimeOptions = {
  showSeconds?: boolean;
};

export function dateTimeBr(
  date: string | null,
  options: DateTimeOptions = {
    showSeconds: false,
  },
) {
  if (!date) {
    return '';
  }

  if (!date.length) {
    return '';
  }

  const formattedValue = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(new Date(date));

  return options.showSeconds
    ? formattedValue.replace(',', '')
    : formattedValue.substring(0, 17).replace(',', '');
}

export function dateBirthBr(date: string | null) {
  if (!date) {
    return '';
  }

  if (!date.length) {
    return '';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    hour12: false,
  }).format(new Date(date));
}

export function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(value);
}
