interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function AppLayoutPageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-sm text-slate-400 font-medium leading-tight">
          {subtitle}
        </p>
      )}
    </div>
  );
}
