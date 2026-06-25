import ProductBanner from '@/components/products/ProductBanner';
import Overview from '@/components/products/amr10/components/Overview';
import Capabilities from '@/components/products/amr10/components/Capabilities';
import TechSpecs from '@/components/products/amr10/components/TechSpecs';
import Applications from '@/components/products/amr10/components/Applications';
import RelatedProducts from '@/components/products/amr10/components/RelatedProducts';
import CTA from '@/components/products/amr10/components/CTA';
import ProductFooterCTA from '@/components/products/ProductFooterCTA';

export default function AMR10() {
  return (
    <main>
      <ProductBanner
        name="AMR10"
        image="/assets/product-amr10.webp"
        imageAlt="AMR10 autonomous mobile robot"
        imageWidth="609px"
        imageHeight="491px"
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
