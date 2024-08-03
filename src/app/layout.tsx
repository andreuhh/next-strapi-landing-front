import { Footer } from "@/components/ui/custom/Footer";
import { Header } from "@/components/ui/custom/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getGlobalPageData, getGlobalPageMetaData } from "./data/loaders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetaData(): Promise<Metadata> {
  const metadata = await getGlobalPageMetaData();
  return {
    title: metadata.title,
    description: metadata.description
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalPageData();
  console.log(globalData);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={globalData.header} />
        <div>{children}</div>
        <Footer data={globalData.footer} />
      </body>
    </html>
  );
}
