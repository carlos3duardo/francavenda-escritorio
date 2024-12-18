import { isReadable, TinyColor } from '@ctrl/tinycolor';

interface BadgeProps {
  label: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  withBorder?: boolean;
  withDot?: boolean;
}

export function Badge({
  label,
  color = 'gray',
  size = 'md',
  withBorder = false,
  withDot = false,
}: BadgeProps) {
  const backgroundColor = new TinyColor(color).lighten(45).toString();
  const borderColor = new TinyColor(color).lighten(36).toString();

  const textColor = isReadable(backgroundColor, color, {
    level: 'AA',
    size: 'large',
  })
    ? color
    : 'rgba(0, 0, 0, 0.8)';

  return (
    <span
      className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium"
      style={{
        backgroundColor,
        color: `${textColor}`,
        boxShadow: withBorder ? `0 0 0 1px inset ${borderColor}` : 'none',
      }}
    >
      {label}
    </span>
  );
}
