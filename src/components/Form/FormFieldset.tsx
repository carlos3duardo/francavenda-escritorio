import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FieldsetProps = ComponentProps<'fieldset'> & {
  children: ReactNode;
  layout?: 'grid' | 'horizontal';
};

export function FormFieldset({
  children,
  className,
  layout = 'grid',
  ...rest
}: FieldsetProps) {
  // const { layout } = useContext(FormContext);

  if (['grid', 'horizontal'].indexOf(layout) === -1) {
    return (
      <fieldset className="p-6 bg-red-50 text-red-400">{`FormFieldset: Layout ${layout} não reconhecido.`}</fieldset>
    );
  }

  return (
    <fieldset
      data-layout={layout}
      className={twMerge(
        `group layout-${layout} px-6 grid grid-cols-12 gap-x-6 gap-y-4 data-[layout=horizontal]:flex data-[layout=horizontal]:flex-col`,
        className,
      )}
    >
      {children}
    </fieldset>
  );
}
