import ProductBanner from '@/components/products/ProductBanner';
import Overview from '@/components/products/amr10/components/Overview';
import Capabilities from '@/components/products/amr10/components/Capabilities';
import TechSpecs from '@/components/products/amr10/components/TechSpecs';
import Applications from '@/components/products/amr10/components/Applications';
import Industries from '@/components/products/amr10/components/Industries';
import RelatedProducts from '@/components/products/amr10/components/RelatedProducts';
import ProductFooterCTA from '@/components/products/ProductFooterCTA';

export const metadata = {
  title: 'AMR10 · Virya',
  description: 'AMR10 is a compact and powerful autonomous mobile robot, designed to tow payloads up to 1000kg in confined manufacturing environments.',
};

export default function AMR10() {
  return (
    <main>
      <ProductBanner
        name="AMR10"
        image="/assets/amr10-banner.webp"
        imageAlt="AMR10 autonomous mobile robot"
        imageWidth="609px"
        imageHeight="491px"
      />
      <Overview />
      <Capabilities />
      <TechSpecs />
      <Applications />
      <Industries />
      <RelatedProducts />
      <ProductFooterCTA onlyConnect />
    </main>
  );
}
