'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { useScramble } from '@/hooks/useScramble';
import styles from './css/Header.module.css';

const SOLUTION_ITEMS = [
  { label: 'Material Mobility', href: '/material-mobility' },
  { label: 'People Mobility',   href: '/people-mobility'   },
  { label: 'R&D Platforms',     href: '/rd-platforms'      },
];

const RESOURCE_ITEMS = [
  { label: 'Service & Training', href: '/resources/service-and-training' },
  { label: 'Partners',           href: '/resources/partners'             },
  { label: 'Blogs',              href: '/resources/blogs'                },
  { label: 'Case studies',       href: '/resources/case-studies'         },
];

const NAV_ITEMS = [
  { label: 'Solutions',  href: '/solutions',  items: SOLUTION_ITEMS },
  { label: 'Technology', href: '/technology' },
  { label: 'Resources',  href: '/resources',  items: RESOURCE_ITEMS },
  { label: 'Company',    href: '/company'    },
  { label: 'Careers',    href: '/careers'    },
];

function getLogoY() {
  const root = getComputedStyle(document.documentElement);
  const header = parseFloat(root.getPropertyValue('--header-height')) || 80;
  return header / 2;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let raf;

    const update = () => {
      const sections = document.querySelectorAll('[data-header-theme]');
      const logoY = getLogoY();
      let matched;
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= logoY && bottom > logoY) {
          matched = section;
        }
      }
      if (matched) setTheme(matched.dataset.headerTheme);

      setScrolled(window.scrollY > 20 && window.innerWidth <= 768);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      data-theme={open ? 'light' : scrolled ? 'dark' : theme}
    >
      <div className={`container ${styles.inner}`}>

        {/* ── Logo ─────────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Virya — Autonomous Technologies"
          onClick={() => {
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className={styles.logoWrap}>
            <Image src="/assets/logo-light.svg" fill alt="Virya" className={styles.logoLight} sizes="(max-width: 768px) 111px, 125px" />
            <Image src="/assets/logo-dark.svg"  fill alt="" className={styles.logoDark} aria-hidden="true" sizes="(max-width: 768px) 111px, 125px" />
          </span>
        </Link>

        {/* ── Desktop nav pill ─────────────────────────────────────────────── */}
        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList} role="list">
            {NAV_ITEMS.map(({ label, href, items, dropdown }) => (
              <li key={href}>
                <NavLink href={href} label={label} items={items} dropdown={dropdown} />
              </li>
            ))}
          </ul>
          <Button href="/contact" size="Button-2" property1="Default">
            Contact Us
          </Button>
        </nav>

        {/* ── Mobile hamburger ─────────────────────────────────────────────── */}
        <button
          className={styles.menuBtn}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <Hamburger open={open} />
        </button>
      </div>

      {/* ── Mobile nav drawer ──────────────────────────────────────────────── */}
      <div
        id="mobile-nav"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ''}`}
        aria-hidden={!open}
      >
        <div className="container">
          <ul className={styles.mobileNavList} role="list">
            {NAV_ITEMS.map(({ label, href, items }) => (
              <li key={href}>
                <MobileNavItem label={label} href={href} items={items} onNavigate={() => setOpen(false)} />
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <Button href="/contact" size="Button-1" property1="Default" onClick={() => setOpen(false)}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNavItem({ href, label, items, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const { display, play, reset } = useScramble(label.toUpperCase());

  if (!items) {
    return (
      <div className={styles.mobileNavItem}>
        <Link href={href} className={styles.mobileNavLink} onClick={onNavigate} onMouseEnter={play} onMouseLeave={reset}>
          <span className={`title-1-md ${styles.navLinkText}`}>
            <span className={styles.navLinkOriginal}>{label}</span>
            <span className={styles.navLinkDisplay} aria-hidden="true">{display}</span>
          </span>
        </Link>
        <div className={styles.mobileDivider} />
      </div>
    );
  }

  return (
    <div className={styles.mobileNavItem}>
      <button
        type="button"
        className={styles.mobileNavLink}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        onMouseEnter={play}
        onMouseLeave={reset}
      >
        <span className={`title-1-md ${styles.navLinkText}`}>
          <span className={styles.navLinkOriginal}>{label}</span>
          <span className={styles.navLinkDisplay} aria-hidden="true">{display}</span>
        </span>
        <Chevron className={`${styles.mobileChevron} ${expanded ? styles.mobileChevronOpen : ''}`} />
      </button>
      <div className={styles.mobileDivider} />
      <div className={`${styles.mobileSubList} ${expanded ? styles.mobileSubListOpen : ''}`}>
        <div className={styles.mobileSubListInner}>
          {items.map((item) => (
            <MobileSubLink key={item.href} href={item.href} label={item.label} onNavigate={onNavigate} />
          ))}
          <div className={styles.mobileDivider} />
        </div>
      </div>
    </div>
  );
}

function MobileSubLink({ href, label, onNavigate }) {
  const { display, play, reset } = useScramble(label.toUpperCase());

  return (
    <Link href={href} className={styles.mobileSubLink} onClick={onNavigate} onMouseEnter={play} onMouseLeave={reset}>
      <span className={`title-2-md ${styles.navLinkText}`}>
        <span className={styles.navLinkOriginal}>{label}</span>
        <span className={styles.navLinkDisplay} aria-hidden="true">{display}</span>
      </span>
    </Link>
  );
}

function NavLink({ href, label, items, dropdown }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const { display, play, reset } = useScramble(label.toUpperCase());

  const handleEnter = () => { clearTimeout(timer.current); setOpen(true); play(); };
  const handleLeave = () => { timer.current = setTimeout(() => setOpen(false), 150); reset(); };
  const handleClick = (e) => {
    if (items) {
      e.preventDefault();
      clearTimeout(timer.current);
      setOpen(true);
    }
  };

  return (
    <div className={styles.navItem} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href={href} className={styles.navLink} onClick={handleClick}>
        <span className={`label-2 ${styles.navLinkText}`}>
          <span className={styles.navLinkOriginal}>{label}</span>
          <span className={styles.navLinkDisplay} aria-hidden="true">{display}</span>
        </span>
        {(items || dropdown) && <Chevron />}
      </Link>
      {items && (
        <div className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`}>
          {items.map((item) => <DropdownItem key={item.href} label={item.label} href={item.href} />)}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ label, href }) {
  const { display, play, reset } = useScramble(label.toUpperCase());

  return (
    <Link
      href={href}
      className={styles.dropdownLink}
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <span className={`label-2 ${styles.navLinkText}`}>
        <span className={styles.navLinkOriginal}>{label}</span>
        <span className={styles.navLinkDisplay} aria-hidden="true">{display}</span>
      </span>
      <span className={styles.dropdownArrow} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </Link>
  );
}

function Chevron({ className }) {
  return (
    <svg className={className || styles.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Hamburger({ open }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
    >
      <rect className={styles.hamburgerBg} width="36" height="36" />
      <line className={`${styles.hamburgerLine} ${styles.hamburgerLineTop}`}
        x1="7" y1="11" x2="29" y2="11" strokeWidth="2" strokeLinejoin="round"/>
      <line className={`${styles.hamburgerLine} ${styles.hamburgerLineMiddle}`}
        x1="7" y1="18" x2="29" y2="18" strokeWidth="2" strokeLinejoin="round"/>
      <line className={`${styles.hamburgerLine} ${styles.hamburgerLineBottom}`}
        x1="7" y1="25" x2="29" y2="25" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
