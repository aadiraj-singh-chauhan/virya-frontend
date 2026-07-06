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
  // R&D Platforms temporarily disabled — remove this comment to re-enable.
  // { label: 'R&D Platforms',  href: '/rd-platforms'       },
];

const NAV_ITEMS = [
  { label: 'Solutions',  href: '/solutions',  items: SOLUTION_ITEMS },
  { label: 'Technology', href: '/technology' },
  { label: 'Resources',  href: '/resources',  dropdown: true },
  { label: 'Company',    href: '/company'    },
  { label: 'Careers',    href: '/careers'    },
];

function getLogoY() {
  const root = getComputedStyle(document.documentElement);
  const strip = parseFloat(root.getPropertyValue('--strip-height')) || 40;
  const header = parseFloat(root.getPropertyValue('--header-height')) || 80;
  return strip + header / 2;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // dark bg on first load
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let raf;

    const update = () => {
      const currentY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentY > lastY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = currentY;

      // Theme detection
      const sections = document.querySelectorAll('[data-header-theme]');
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        const logoY = getLogoY();
        if (top <= logoY && bottom > logoY) {
          setTheme(section.dataset.headerTheme);
          return;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    lastY.current = window.scrollY;
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <header className={`${styles.header} ${visible ? '' : styles.headerHidden}`} data-theme={theme}>
      <div className={`container ${styles.inner}`}>

        {/* ── Logo — both variants stacked; CSS cross-fades on data-theme ────── */}
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Virya — Autonomous Technologies"
          onClick={() => {
            // Same-route navigation is a no-op for next/link, so clicking the
            // logo while already on "/" wouldn't otherwise scroll to top.
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className={styles.logoWrap}>
            <Image src="/assets/logo-light.svg" fill alt="Virya" className={styles.logoLight} sizes="(max-width: 768px) 80px, 125px" />
            <Image src="/assets/logo-dark.svg"  fill alt="" className={styles.logoDark} aria-hidden="true" sizes="(max-width: 768px) 80px, 125px" />
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
        <ul className={styles.mobileNavList} role="list">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={styles.mobileNavLink} onClick={() => setOpen(false)}>
                <span className="label-2">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileCta}>
          <Button href="/contact" size="Button-1" property1="Default" onClick={() => setOpen(false)}>
            Contact Us
          </Button>
        </div>
      </div>
    </header>
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

function Chevron() {
  return (
    <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Hamburger({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18" y1="4" x2="4"  y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <line x1="2" y1="6"  x2="20" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
}
