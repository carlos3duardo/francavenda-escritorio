'use client';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp, Dot } from 'lucide-react';
import { MenuItemProps, SubmenuItemProps } from '@/data/menu';

export function NavigationMenuItem({
  id,
  label,
  href,
  icon: Icon,
  submenu,
}: MenuItemProps) {
  const [isActive, setIsActive] = useState(false);
  const [submenuIsOpen, setSubmenuIsOpen] = useState(isActive);
  const [submenuItems, setSubmenuItems] = useState<
    SubmenuItemProps[] | undefined
  >([]);
  const pathname = usePathname();
  const menuContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active =
      pathname === '/' && href === pathname
        ? true
        : pathname !== '/' && href !== '/' && pathname.startsWith(href);

    setIsActive(active);
    setSubmenuIsOpen(pathname.startsWith(href));
  }, [pathname, href]);

  useEffect(() => {
    const navItems = submenu
      ? submenu.filter((item) => {
          if (item.free) return true;

          return true;
        })
      : undefined;

    setSubmenuItems(navItems);
  }, [submenu]);

  const handleClick = useCallback((event: SyntheticEvent, push: boolean) => {
    if (!push) {
      event.preventDefault();

      if (menuContainer.current) {
        const submenu = menuContainer.current.querySelector('ul');

        if (menuContainer.current.clientHeight) {
          menuContainer.current.style.height = `0`;
          setSubmenuIsOpen(false);
        } else {
          if (submenu) {
            menuContainer.current.style.height = `${
              submenu.offsetHeight + 2
            }px`;
          }
          setSubmenuIsOpen(true);
        }
      }
    }
  }, []);

  return (
    <div data-active={isActive} className="rounded">
      <Link
        href={href}
        data-active={isActive}
        className="w-full flex items-center gap-3 px-4 xl:px-6 h-10 rounded text-sm font-medium text-white transition relative hover:bg-primary-700/60 hover:text-secondary-300 data-[active=true]:bg-primary-700/60 data-[active=true]:ring-1 data-[active=true]:ring-primary-100/10 data-[active=true]:hover:bg-primary-700/60"
        prefetch={false}
        onClick={(evt) => handleClick(evt, !submenu)}
      >
        <div className="flex-1 flex gap-3">
          <Icon size={18} />
          {label}
        </div>
        {submenu && (
          <span className="pl-2">
            {submenu &&
              (submenuIsOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </span>
        )}
      </Link>
      {submenuItems && (
        <div
          data-is-open={submenuIsOpen}
          className="px-6 overflow-hidden duration-500 data-[is-open=false]:h-0"
          ref={menuContainer}
        >
          <ul className="flex flex-col gap-[0.125rem] mt-1 pb-2 pt-1">
            {submenuItems.map((link) => (
              <li key={`${id}.${link.id}`} className="text-sm">
                <Link
                  href={link.href}
                  prefetch={false}
                  className="flex items-center gap-3 font-medium text-white hover:text-primary-300"
                >
                  <Dot size={18} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
