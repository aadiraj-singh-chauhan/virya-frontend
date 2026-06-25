'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { useScramble } from '@/hooks/useScramble';
import styles from './Header.module.css';

const SOLUTION_ITEMS = [
  { label: 'Material Mobility', href: '/material-mobility' },
  { label: 'People Mobility',   href: '/people-mobility'   },
  { label: 'R&D Platforms',     href: '/rd-platforms'       },
];

const NAV_ITEMS = [
  { label: 'Solutions',  href: '/solutions',  items: SOLUTION_ITEMS },
  { label: 'Technology', href: '/technology' },
  { label: 'Resources',  href: '/resources',  dropdown: true },
  { label: 'Company',    href: '/company'    },
  { label: 'Careers',    href: '/careers'    },
];

// Vertical midpoint of the header: strip (40px) + half header (40px) = 80px.
const LOGO_Y = 80;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // dark bg on first load
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

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
        if (top <= LOGO_Y && bottom > LOGO_Y) {
          setTheme(section.dataset.headerTheme);
          return;
        }
      }
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
  }, []);

  return (
    <header className={`${styles.header} ${visible ? '' : styles.headerHidden}`} data-theme={theme}>
      <div className={`container ${styles.inner}`}>

        {/* ── Logo — both variants stacked; CSS cross-fades on data-theme ────── */}
        <Link href="/" className={styles.logoLink} aria-label="Virya — Autonomous Technologies">
          <Image src="/assets/logo-light.svg" alt="Virya" className={styles.logoLight} width={142} height={50} />
          <Image src="/assets/logo-dark.svg"  alt=""       className={styles.logoDark}  width={142} height={50} aria-hidden="true" />
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

  return (
    <div className={styles.navItem} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href={href} className={styles.navLink}>
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
