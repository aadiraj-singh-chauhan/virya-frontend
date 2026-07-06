'use client';

import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import Button from '@/components/ui/Button';
import FooterGlow from './FooterGlow';
import styles from './css/Footer.module.css';

const NAV = [
  {
    title: 'Material mobility',
    links: [
      { label: 'AMR10', href: '/products/amr10' },
      { label: 'AMR50', href: '/products/amr50' },
      { label: 'APT20', href: '/products/apt20' },
    ],
  },
  {
    title: 'People mobility',
    links: [{ label: 'APM', href: '/people-mobility' }],
  },
  {
    title: 'R&D platform',
    links: [{ label: 'DBW', href: '/products/dbw' }],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Service & Training', href: '/resources/service' },
      { label: 'Partners', href: '/resources/partners' },
      { label: 'Blogs', href: '/resources/blogs' },
      { label: 'Case studies', href: '/resources/case-studies' },
    ],
  },
];

function NavLink({ href, children }) {
  const { display, play, reset } = useScramble(children);
  return (
    <a href={href} onMouseEnter={play} onMouseLeave={reset}>
      <span className={styles.linkText}>
        <span className={styles.textOriginal}>{children}</span>
        <span className={styles.textDisplay} aria-hidden="true">{display || children}</span>
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer} data-header-theme="dark">
      <FooterGlow className={styles.bgGlow} />

      <div className="container">
        <div className={styles.main}>
          <div className={styles.cta}>
            <p className="title-1">Ready for factory automation?</p>
            <Button href="/contact" property1="Variant3" size="Button-2">Contact us</Button>
          </div>
          <nav className={styles.nav}>
            {NAV.map(col => (
              <div key={col.title} className={styles.navCol}>
                <span className="label-2" style={{ opacity: 0.4 }}>{col.title}</span>
                <ul className={styles.navList}>
                  {col.links.map(link => (
                    <li key={link.label}>
                      <NavLink href={link.href}>{link.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.brand}>
          <div className={styles.brandLeft}>
            <Image src="/assets/logo-light.svg" alt="Virya" width={142} height={50} className={styles.logo} />
            <div className={styles.socials}>
              <a href="https://instagram.com" aria-label="Instagram">
                <Image src="/assets/icon-instagram.svg" alt="" width={20} height={20} className={styles.socialIcon} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <Image src="/assets/icon-linkedin.svg" alt="" width={20} height={20} className={styles.socialIcon} />
              </a>
              <a href="https://youtube.com" aria-label="YouTube">
                <Image src="/assets/icon-youtube.svg" alt="" width={20} height={20} className={styles.socialIcon} />
              </a>
            </div>
          </div>
          <p className="label-2">A Maini Group Company</p>
        </div>
      </div>

      <div className={styles.dividerWrap}>
        <Image src="/assets/footer-divider.webp" fill sizes="100vw" className={styles.divider} alt="" aria-hidden="true" />
      </div>

      <div className="container">
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>2026 Virya Autonomous Technologies Pvt. Ltd. All Rights Reserved</p>
          <div className={styles.policies}>
            <a href="/privacy" className={styles.policyLink}>Privacy Policy</a>
            <a href="/cookies" className={styles.policyLink}>Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
