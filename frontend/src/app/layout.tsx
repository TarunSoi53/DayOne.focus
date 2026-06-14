import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: "DayOne.Focus",
  description: "High-performance behavioral optimization tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#050505] text-[#d4d4d8] flex h-screen overflow-hidden`}>
        <ReactQueryProvider>
          <Sidebar />
          <main className="flex-1 min-w-0 h-full overflow-y-auto relative scrollbar-none">
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
