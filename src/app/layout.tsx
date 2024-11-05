
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { usePathname } from "next/navigation";
import ContactUsForm from "@/components/ContactUsForm";
import Footer from "@/components/Footer";
import RecoilProvider from "@/components/RecoilProvider";
import ClientNavbarWrapper from "@/components/ClientNavbarWrapper ";
import ClientContactFormWrapper from "@/components/ClientContactFormWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Google Analytics Component for tracking page views
// function GoogleAnalytics() {
//   const pathname = usePathname();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.gtag("config", "G-5MF7F8L6PB", {
//         page_path: pathname,
//       });
//     }
//   }, [pathname]);

//   return null;
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecoilProvider>
            {/* <GoogleAnalytics /> */}
            {/* <ClientNavbarWrapper /> */}
            {/* <ClientContactFormWrapper /> */}
            <main>{children}</main>
            <Footer />
        </RecoilProvider>
      </body>
    </html>
  );
}
