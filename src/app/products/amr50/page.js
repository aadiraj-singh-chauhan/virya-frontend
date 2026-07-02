import ProductBanner from '@/components/products/ProductBanner';
import Overview from '@/components/products/amr50/components/Overview';
import Capabilities from '@/components/products/amr50/components/Capabilities';
import TechSpecs from '@/components/products/amr50/components/TechSpecs';
import Applications from '@/components/products/amr50/components/Applications';
import RelatedProducts from '@/components/products/amr50/components/RelatedProducts';
import CTA from '@/components/products/amr50/components/CTA';
import ProductFooterCTA from '@/components/products/ProductFooterCTA';

export const metadata = {
  title: 'AMR50 · Virya',
  description: 'AMR50 is a rugged and powerful autonomous mobile robot, designed to tow payloads up to 5000kg with hybrid manual and autonomous operation.',
};

export default function AMR50() {
  return (
    <main>
      <ProductBanner
        name="AMR50"
        image="/assets/product-amr50.webp"
        imageAlt="AMR50 autonomous mobile robot"
        imageWidth="760px"
        imageHeight="460px"
      />
      <Overview />
      <Capabilities />
      <TechSpecs />
      <Applications />
      <RelatedProducts />
      <CTA />
      <ProductFooterCTA />
    </main>
  );
}
