import Button from '@/components/ui/Button';
import styles from './page.module.css';

export const metadata = {
  title: 'Style Guide · Virya',
  description: 'Design tokens and components extracted from Figma.',
};

export default function StyleGuide() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className={styles.hero} data-header-theme="dark">
        <p className="label-2">Virya · Style Guide</p>
        <h1 className="heading-1">Design tokens &amp; components</h1>
        <p className="body-1">Colors, typography and buttons extracted from Figma.</p>
      </section>

      {/* ── Colors ────────────────────────────────────────────────────────── */}
      <section className={styles.section} data-header-theme="light">
        <h2 className="title-1">Colors</h2>
        <div className={styles.swatchGrid}>
          {[1, 2, 3, 4, 5, 6, 8].map((n) => (
            <div key={n} className={styles.swatch}>
              <div
                className={styles.swatchColor}
                style={{
                  background: `var(--color-${n})`,
                  border: n === 5 || n === 6 || n === 8 ? '1px solid #e0e0e0' : 'none',
                }}
              />
              <span className="label-2">color-{n}</span>
            </div>
          ))}
        </div>

        <h3 className={`title-2 ${styles.subheading}`}>Gradients</h3>
        <div className={styles.swatchGrid}>
          {[1, 2, 3].map((n) => (
            <div key={n} className={styles.swatch}>
              <div
                className={styles.swatchColor}
                style={{ background: `var(--gradient-${n})` }}
              />
              <span className="label-2">gradient-{n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ────────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.dark}`} data-header-theme="dark">
        <h2 className="title-1">Typography</h2>

        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>heading-0</span>
          <span className="heading-0">Virya</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>heading-1</span>
          <span className="heading-1">Autonomous Mobility</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>heading-2</span>
          <span className="heading-2">Smarter Operations</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>title-1</span>
          <span className="title-1">Material Mobility</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>title-2</span>
          <span className="title-2">Product Overview</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>label-1</span>
          <span className="label-1">Explore AMR10</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>label-2</span>
          <span className="label-2">Get custom solutions</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>body-1</span>
          <span className="body-1">Autonomous pallet truck designed for 2-ton lifting capacity.</span>
        </div>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>body-2</span>
          <span className="body-2">Offering seamless manual and autonomous hybrid modes.</span>
        </div>
      </section>

      {/* ── Buttons ───────────────────────────────────────────────────────── */}
      <section className={styles.section} data-header-theme="light">
        <h2 className="title-1">Buttons</h2>

        <h3 className={`title-2 ${styles.subheading}`}>Button 1 — size lg</h3>
        <div className={styles.buttonRow}>
          <Button size="Button-1" property1="Default">Explore AMR10</Button>
          <Button size="Button-1" property1="Variant2">Explore AMR10</Button>
          <Button size="Button-1" property1="Variant3">Explore AMR10</Button>
        </div>

        <h3 className={`title-2 ${styles.subheading}`}>Button 2 — size sm</h3>
        <div className={styles.buttonRow}>
          <Button size="Button-2" property1="Default">Get custom solutions</Button>
          <Button size="Button-2" property1="Variant2">Get custom solutions</Button>
          <Button size="Button-2" property1="Variant3">Get custom solutions</Button>
        </div>

        <h3 className={`title-2 ${styles.subheading}`}>Button-3 — text link</h3>
        <div className={styles.buttonRow}>
          <Button property1="Button-3">Explore more</Button>
        </div>
      </section>

    </main>
  );
}
