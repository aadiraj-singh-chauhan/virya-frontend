import Image from 'next/image';
import Link from 'next/link';
import styles from '../css/ArticleDetail.module.css';

function ShareIcons() {
  return (
    <svg width="82" height="16" viewBox="0 0 82.0937 15.3882" fill="none" aria-hidden="true" className={styles.shareIcons}>
      <path d="M6.54767 2.55446H7.99416V0.10774C7.2938 0.0349135 6.59011 -0.001042 5.88598 2.29777e-05C3.79319 2.29777e-05 2.36209 1.27724 2.36209 3.61624V5.6321H0V8.37119H2.36209V15.3882H5.19351V8.37119H7.5479L7.90183 5.6321H5.19351V3.88554C5.19351 3.07766 5.40894 2.55446 6.54767 2.55446Z" fill="currentColor" />
      <path d="M46.0937 15.3877V9.43487C46.0937 6.24514 44.3912 4.76096 42.1212 4.76096C40.2893 4.76096 39.4683 5.76869 39.0109 6.47607V5.00497H35.5596C35.6054 5.9795 35.5596 15.3877 35.5596 15.3877H39.0109V9.58932C39.0109 9.27991 39.0331 8.96949 39.1246 8.74812C39.3737 8.12778 39.9417 7.48581 40.8946 7.48581C42.1438 7.48581 42.6429 8.4377 42.6429 9.83333V15.3882L46.0937 15.3877ZM31.9236 3.5877C33.1265 3.5877 33.8767 2.78977 33.8767 1.7931C33.8545 0.774804 33.127 1.19209e-05 31.9467 1.19209e-05C30.7664 1.19209e-05 29.9942 0.774301 29.9942 1.7931C29.9942 2.78977 30.7433 3.5877 31.902 3.5877H31.9236ZM33.6493 15.3877V5.00497H30.1984V15.3877H33.6493Z" fill="currentColor" />
      <path d="M75.1275 10.3007L72.3932 13.2303C72.0621 13.5726 71.62 13.7639 71.1599 13.7639C70.6998 13.7639 70.2577 13.5726 69.9267 13.2303C69.7643 13.057 69.6355 12.8511 69.5476 12.6243C69.4596 12.3976 69.4144 12.1544 69.4144 11.9089C69.4144 11.6634 69.4596 11.4203 69.5476 11.1935C69.6355 10.9668 69.7643 10.7608 69.9267 10.5876L72.661 7.65796C72.7937 7.51579 72.8682 7.32295 72.8682 7.12188C72.8682 6.9208 72.7937 6.72797 72.661 6.58579C72.5283 6.44361 72.3483 6.36373 72.1606 6.36373C71.9729 6.36373 71.793 6.44361 71.6603 6.58579L68.926 9.52295C68.3751 10.1653 68.0772 11.0109 68.0944 11.8831C68.1117 12.7552 68.4427 13.5865 69.0184 14.2033C69.5942 14.8202 70.37 15.1749 71.184 15.1933C71.998 15.2118 72.7872 14.8926 73.3868 14.3024L76.1282 11.3728C76.2609 11.2306 76.3354 11.0378 76.3354 10.8367C76.3354 10.6357 76.2609 10.4428 76.1282 10.3007C75.9955 10.1585 75.8155 10.0786 75.6278 10.0786C75.4401 10.0786 75.2602 10.1585 75.1275 10.3007ZM81.1739 1.1796C80.5811 0.548385 79.7793 0.1941 78.9435 0.1941C78.1077 0.1941 77.3059 0.548385 76.7131 1.1796L73.9717 4.10921C73.906 4.17961 73.8539 4.26319 73.8183 4.35517C73.7828 4.44715 73.7645 4.54574 73.7645 4.6453C73.7645 4.74486 73.7828 4.84345 73.8183 4.93543C73.8539 5.02741 73.906 5.11099 73.9717 5.18139C74.0374 5.25179 74.1154 5.30763 74.2013 5.34573C74.2871 5.38383 74.3792 5.40344 74.4721 5.40344C74.565 5.40344 74.657 5.38383 74.7429 5.34573C74.8287 5.30763 74.9067 5.25179 74.9724 5.18139L77.7067 2.25178C78.0378 1.90946 78.4799 1.71815 78.94 1.71815C79.4001 1.71815 79.8422 1.90946 80.1732 2.25178C80.3356 2.42506 80.4644 2.63098 80.5523 2.85773C80.6402 3.08448 80.6855 3.32759 80.6855 3.57312C80.6855 3.81866 80.6402 4.06177 80.5523 4.28852C80.4644 4.51527 80.3356 4.72119 80.1732 4.89447L77.4389 7.82408C77.3729 7.89427 77.3205 7.97778 77.2847 8.06979C77.2489 8.1618 77.2305 8.26049 77.2305 8.36016C77.2305 8.45984 77.2489 8.55853 77.2847 8.65054C77.3205 8.74255 77.3729 8.82606 77.4389 8.89625C77.5044 8.96702 77.5824 9.02319 77.6683 9.06153C77.7541 9.09986 77.8463 9.1196 77.9393 9.1196C78.0323 9.1196 78.1244 9.09986 78.2103 9.06153C78.2962 9.02319 78.3741 8.96702 78.4396 8.89625L81.1739 5.95909C81.7631 5.32393 82.0937 4.46482 82.0937 3.56935C82.0937 2.67388 81.7631 1.81477 81.1739 1.1796ZM72.816 10.1345C72.8818 10.2045 72.9599 10.2599 73.0458 10.2975C73.1317 10.335 73.2236 10.3541 73.3163 10.3535C73.4091 10.3541 73.501 10.335 73.5869 10.2975C73.6727 10.2599 73.7508 10.2045 73.8167 10.1345L77.2839 6.41968C77.4166 6.2775 77.4911 6.08466 77.4911 5.88359C77.4911 5.68252 77.4166 5.48968 77.2839 5.3475C77.1512 5.20532 76.9712 5.12545 76.7835 5.12545C76.5959 5.12545 76.4159 5.20532 76.2832 5.3475L72.816 9.06236C72.7499 9.13256 72.6975 9.21607 72.6617 9.30808C72.626 9.40009 72.6075 9.49878 72.6075 9.59845C72.6075 9.69813 72.626 9.79682 72.6617 9.88883C72.6975 9.98084 72.7499 10.0643 72.816 10.1345Z" fill="currentColor" />
    </svg>
  );
}

function ShareRow() {
  return (
    <div className={styles.shareRow}>
      <p className="body-1">Share this article</p>
      <ShareIcons />
    </div>
  );
}

export default function ArticleDetail({ backHref, backLabel, post, related }) {
  return (
    <>
      <div className={styles.section} data-header-theme="light">
        <div className="container">
          <div className={styles.layout}>
            <Link href={backHref} className={styles.backLink}>
              <svg width="5" height="9" viewBox="0 0 5.06066 8.70711" fill="none" aria-hidden="true">
                <path d="M4.70711 0.353553L0.707107 4.35355L4.70711 8.35355" stroke="currentColor" />
              </svg>
              <span>{backLabel}</span>
            </Link>

            <div className={styles.main}>
              <div className={styles.article}>
                <div className={styles.meta}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.tag}>{post.category}</span>
                </div>

                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.lead}>{post.lead}</p>

                <ShareRow />

                <div className={styles.heroImageWrap}>
                  <Image src={post.heroImage} alt={post.title} fill sizes="(max-width: 900px) 100vw, 908px" className={styles.heroImage} />
                </div>

                <div className={styles.summary}>
                  <p className={styles.summaryLabel}>Summary</p>
                  <p className="body-1">{post.summary}</p>
                </div>
              </div>

              <div className={styles.block}>
                <h2 className={styles.subheading}>{post.section1.heading}</h2>
                <p className="body-1">{post.section1.intro}</p>
                <p className="body-1">{post.section1.note}</p>
                <ul className={styles.bulletList}>
                  {post.section1.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bullet} aria-hidden="true" />
                      <span className="body-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.block}>
                <h2 className={styles.subheading}>{post.section2.heading}</h2>
                <p className="body-1">
                  {post.section2.bodyBefore}
                  <span className={styles.highlight}>{post.section2.highlight}</span>
                  {post.section2.bodyAfter}
                </p>
                <div className={styles.sectionImageWrap}>
                  <Image src={post.section2.image} alt="" fill sizes="(max-width: 900px) 100vw, 908px" className={styles.sectionImage} />
                  <div className={styles.sectionImageOverlay} aria-hidden="true" />
                </div>
              </div>

              <div className={styles.block}>
                <h2 className={styles.subheading}>{post.section3.heading}</h2>
                <p className="body-1">{post.section3.body}</p>
              </div>

              <Link href={backHref} className={styles.exploreLink}>
                <span>{post.exploreLinkText}</span>
                <svg width="16" height="13" viewBox="0 0 16 12.871" fill="none" aria-hidden="true">
                  <path d="M0 6.4355L16 6.4355M9 0.4355L15.5645 6.4355L9 12.4355" stroke="currentColor" strokeWidth="1" />
                </svg>
              </Link>

              <ShareRow />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.relatedSection} data-header-theme="light">
        <div className="container">
          <div className={styles.relatedHeader}>
            <h2 className={styles.subheading}>Here are a few more similar articles</h2>
            <Link href={backHref} className={styles.readMoreLink}>
              <span className="label-2 label-1-md">Read more</span>
              <svg width="13" height="11" viewBox="0 0 12.758 10.056" fill="none" aria-hidden="true">
                <path d="M0 5.028L12.5 5.028" stroke="currentColor" />
                <path d="M6 0L8 0L12.5 5.028L8 10.056L6 10.056" stroke="currentColor" />
              </svg>
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.slug} href={`${backHref}/${item.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImageWrap}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 444px" className={styles.relatedImage} />
                </div>
                <div className={styles.tags}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.relatedTag}>{tag}</span>
                  ))}
                </div>
                <p className={styles.relatedTitle}>{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
