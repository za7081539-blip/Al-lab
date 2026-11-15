import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/reduxToolkit/provider";
import AuthStateListener from "@/components/AuthStateListener";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Labs",
  description:
    "Your personal workspace to keep learning, build projects, and track your progress as you explore AI tools and technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Providers>
        <AuthStateListener>
        {children}
        </AuthStateListener>
      </Providers>
      </body>
    </html>
  );
}
