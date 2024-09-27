interface PageTitleProps {
  title: string | undefined;
  subtitle?: string;
}

export function AppLayoutPageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <>
      <h1 className="text-xl text-slate-600 dark:text-slate-200 font-semibold">
        {title || 'Carregando...'}
      </h1>
      {subtitle && (
        <p className="text-sm text-slate-400 font-medium">{subtitle}</p>
      )}
    </>
  );
}
