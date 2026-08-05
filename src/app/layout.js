import { Space_Grotesk, Chakra_Petch } from "next/font/google";
import EventStrip from "@/components/layout/EventStrip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata = {
  title: "Virya",
  description: "Autonomous mobility for smarter operations",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${chakraPetch.variable}`}
    >
      <body>
        <EventStrip />
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
