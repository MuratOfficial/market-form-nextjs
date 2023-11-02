import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

// import {Montserrat as FontSans} from "@fontsource/montserrat-alternates/500.css";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Форма запроса",
  description: "Форма запроса для разработки веб-сайта",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow p-12 mx-20 mt-10 ">
            {children}
          </div>
          <Toaster />
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
