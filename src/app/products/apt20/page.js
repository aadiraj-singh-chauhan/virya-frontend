import ProductBanner from '@/components/products/ProductBanner';
import Overview from '@/components/products/apt20/components/Overview';
import Capabilities from '@/components/products/apt20/components/Capabilities';
import TechSpecs from '@/components/products/apt20/components/TechSpecs';
import Applications from '@/components/products/apt20/components/Applications';
import RelatedProducts from '@/components/products/apt20/components/RelatedProducts';
import CTA from '@/components/products/apt20/components/CTA';

export default function APT20() {
  return (
    <main>
      <ProductBanner
        name="APT20"
        image="/assets/product-apt20.webp"
        imageAlt="APT20 autonomous pallet truck"
        imageWidth="480px"
        imageHeight="540px"
      />
      <Overview />
      <Capabilities />
      <TechSpecs />
      <Applications />
      <RelatedProducts />
      <CTA />
    </main>
  );
}
