import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Notion",
  description: "Take better notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Providers>
          {/* provider wraps the entier react tree so that same request is used or cache is used instead of calling the same
          endpoint repeatedly so that all nodes in react tree have access to the cached data from the tanstack query */}
          <body className={inter.className}>{children}</body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
