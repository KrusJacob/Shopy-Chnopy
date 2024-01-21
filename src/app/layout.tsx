import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Providers } from "@/components/layouts/providers/Providers";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopy Chnopy",
  description: "Shopy Chnopy - best online shop!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className={montserrat.className}>
          <Header />
          <main className="max-w-[1700px] m-auto pt-5 px-2 pb-24">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
