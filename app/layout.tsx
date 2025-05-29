import "./globals.css";
import { Roboto } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"
import Footer from "./components/ux/Footer";
import Header from "./components/ux/Header";

export const metadata = {
  title: `jabercrombia`,
  description: `This is a job submission portal`,
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Justin Abercrombia', url: 'http://www.github.com/jabercrombia' }],
  creator: 'Justin Abercrombia',
  openGraph: {
    images: '/homepage/homepage_thumb.png',
  },
};

const roboto = Roboto({
  weight: ['100','300','400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={roboto.className}>
      <GoogleAnalytics gaId={process.env.GOOGLE_TRACKIND_ID || ''} />
        <body>
            <div className="flex flex-col min-h-screen">
              <Header/>
                <main className="flex-grow">
                  {children}
                </main>
              <Footer />
            </div>
            <Analytics />
        </body>
      </html>
    </>
  );
}
