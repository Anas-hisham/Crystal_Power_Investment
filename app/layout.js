import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FashionHub | Premium Clothing Store",
  description: "Shop the latest men's and women's clothing at competitive prices",
  keywords: ["fashion", "clothing", "online shopping"],
  openGraph: {
    title: "FashionHub | Premium Clothing Store",
    description: "Shop the latest men's and women's clothing",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>

      </body>
    </html>
  );
}
