import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './Gallery.module.css';

const IMAGES = [
  { src: '/assets/rd-platforms-gallery-1.webp', alt: 'Operator driving an autonomous platform outdoors' },
  { src: '/assets/rd-platforms-gallery-2.webp', alt: 'Engineer testing hardware in the lab' },
  { src: '/assets/rd-platforms-gallery-3.webp', alt: 'Autonomous platform navigating a warehouse floor' },
];

export default function Gallery() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.title}`}>
        Engineering autonomy for real-world applications
      </h2>

      <div className={styles.content}>
        <div className={styles.images}>
          {IMAGES.map((img) => (
            <div key={img.src} className={styles.imageWrap}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} />
            </div>
          ))}
        </div>

        <p className={`body-1 ${styles.desc}`}>
          Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec convallis libero. Tincidunt risus in sapien urna donec morbi aliquam ac. Tempus sed id sem mi nullam. A placerat posuere vulputate lacinia quis morbi lobortis feugiat est. Vestibulum arcu egestas pellentesque
        </p>

        <Button property1="Variant2" size="Button-1" href="#">Know more about us</Button>
      </div>
    </section>
  );
}
