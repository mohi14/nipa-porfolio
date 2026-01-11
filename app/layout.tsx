import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MediaSidebar from "./components/MediaSidebar";


const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nipa - Web Designer & Front-end Developer",
  description: "Portfolio of Nipa - Web designer and front-end developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} antialiased bg-[#282c33]`}
      >
        <CustomCursor />
        <Header />
        <MediaSidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
