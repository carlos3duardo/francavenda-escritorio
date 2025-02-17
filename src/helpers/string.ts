export function firstName({
  fullName,
  ucfirst = true,
}: {
  fullName: string;
  ucfirst?: boolean;
}) {
  const [firstName] = fullName.split(' ');

  return ucfirst
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : firstName;
}

export function shortName({
  fullName,
  ucfirst = true,
}: {
  fullName: string;
  ucfirst?: boolean;
}) {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length < 2) {
    if (ucfirst) {
      return capitalize(fullName);
    }

    return fullName;
  }

  if (ucfirst) {
    return `${capitalize(parts[0])} ${capitalize(parts[parts.length - 1])}`;
  }
}

export function capitalize(str: string) {
  const parts = str.split(' ');

  return parts.reduce((acc, part) => {
    return `${acc} ${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`;
  }, '');
}

export function initials(str: string, size = 2) {
  const parts = str.split(' ');

  return parts
    .reduce((acc, part) => {
      return `${acc}${part.charAt(0).toUpperCase()}`;
    }, '')
    .slice(0, size);
}
