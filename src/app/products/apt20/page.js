import ProductBanner from '@/components/products/ProductBanner';
import Overview from '@/components/products/apt20/components/Overview';
import Capabilities from '@/components/products/apt20/components/Capabilities';
import TechSpecs from '@/components/products/apt20/components/TechSpecs';
import Applications from '@/components/products/apt20/components/Applications';
import RelatedProducts from '@/components/products/apt20/components/RelatedProducts';
import ProductFooterCTA from '@/components/products/ProductFooterCTA';

export const metadata = {
  title: 'APT20 · Virya',
  description: 'APT20 is an autonomous pallet truck designed for 2-ton lifting capacity, offering seamless manual and autonomous hybrid operation modes.',
};

export default function APT20() {
  return (
    <main>
      <ProductBanner
        name="APT20"
        image="/assets/apt20-banner.webp"
        imageAlt="APT20 autonomous pallet truck"
        imageWidth="480px"
        imageHeight="540px"
      />
      <Overview />
      <Capabilities />
      <TechSpecs />
      <Applications />
      <RelatedProducts />
      <ProductFooterCTA />
    </main>
  );
}
