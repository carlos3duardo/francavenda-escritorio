import { TinyColor } from '@ctrl/tinycolor';

interface BadgeProps {
  label: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  withBorder?: boolean;
  withDot?: boolean;
  tooltip?: string;
}

export function Badge({
  label,
  color = 'gray',
  size = 'md',
  withBorder = false,
  withDot = false,
  tooltip,
}: BadgeProps) {
  const backgroundColor = new TinyColor(color).setAlpha(0.36).toString();
  const borderColor = new TinyColor(color).setAlpha(0.36).toString();

  return (
    <span
      className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium"
      style={{
        backgroundColor,
        boxShadow: withBorder ? `0 0 0 1px inset ${borderColor}` : 'none',
      }}
      title={tooltip}
    >
      {label}
    </span>
  );
}
