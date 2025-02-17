import { twMerge } from 'tailwind-merge';

export default function ScreenSizeView() {
  const defaultStyle =
    'hidden items-center rounded-md bg-slate-300 px-2 py-1 text-xs uppercase font-medium text-slate-700';
  return (
    <div>
      <span className={twMerge(defaultStyle, 'block md:hidden')}>sm</span>
      <span className={twMerge(defaultStyle, 'md:block lg:hidden')}>md</span>
      <span className={twMerge(defaultStyle, 'lg:block xl:hidden')}>lg</span>
      <span className={twMerge(defaultStyle, 'xl:block 2xl:hidden')}>xl</span>
      <span className={twMerge(defaultStyle, '2xl:block')}>2xl</span>
    </div>
  );
}
