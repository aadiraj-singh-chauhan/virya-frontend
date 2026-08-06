import styles from "./page.module.css";
import Banner from "@/components/material-mobility/components/Banner";
import VideoSection from "@/components/material-mobility/components/VideoSection";
import Features from "@/components/material-mobility/components/Features";
import Ecosystem from "@/components/material-mobility/components/Ecosystem";
import Specs from "@/components/material-mobility/components/Specs";
import Platforms from "@/components/material-mobility/components/Platforms";
import CustomSolution from "@/components/material-mobility/components/CustomSolution";
import RoutingCTAs from "@/components/material-mobility/components/RoutingCTAs";

export const metadata = {
  title: "Material Mobility · Virya",
  description: "Smart mobility powering better material operations — autonomous platforms for indoor and outdoor material handling.",
};

export default function MaterialMobility() {
  return (
    <main className={styles.main}>
      <Banner />
      <VideoSection />
      <Features />
      <Platforms />
      <Ecosystem />
      <Specs />
      <CustomSolution />
      <RoutingCTAs />
    </main>
  );
}
