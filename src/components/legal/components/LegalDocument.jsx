import styles from '../css/LegalDocument.module.css';

function SectionContent({ item }) {
  if (typeof item === 'string') {
    return <p className="body-1">{item}</p>;
  }

  if (item.bullets) {
    return (
      <>
        {item.intro && <p className="body-1">{item.intro}</p>}
        <ul className={styles.bulletList}>
          {item.bullets.map((bullet) => (
            <li key={bullet} className={styles.bulletItem}>
              <span className={styles.bullet} aria-hidden="true" />
              <span className="body-1">{bullet}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (item.link) {
    return (
      <p className="body-1">
        {item.text}
        <a href={item.link.href} className={styles.inlineLink}>{item.link.text}</a>
      </p>
    );
  }

  return null;
}

export default function LegalDocument({ title, lastUpdated, intro, sections }) {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.wrap}>
        <div className={styles.headerRow}>
          <h1 className="heading-2 heading-2-md">{title}</h1>
          <p className={styles.updated}>
            Last Updated: <span className={styles.date}>{lastUpdated}</span>
          </p>
        </div>
        <div className={styles.divider} />

        <div className={styles.body}>
          <p className="body-1">{intro}</p>

          {sections.map((section) => (
            <div key={section.heading} className={styles.docSection}>
              <h2 className="title-1">{section.heading}</h2>
              {section.paragraphs.map((item, i) => (
                <SectionContent key={i} item={item} i={i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
