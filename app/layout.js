import './globals.css';

export const metadata = {
  title: 'Taiki Hika - Japan WorkCulture Wizard - Essential Japanese Phrases for travelling and bussiness',
  description: 'Master essential Japanese phrases for your trip to Japan. Learn pronunciation, context, and cultural tips with Taiki Hika.',
  keywords: 'Japanese phrases, travel Japan, learn Japanese, tourist phrases, Japan travel guide',
  openGraph: {
    title: 'Taiki Hika - Japan WorkCulture Wizard - Essential Japanese Phrases for travelling and bussiness',
    description: 'Your companion for learning essential Japanese phrases',
    url: 'https://taikihika.vercel.app',
    siteName: 'Taiki Hika - Japan WorkCulture Wizard',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taiki Hika - Japan WorkCulture Wizard - Essential Japanese Phrases',
    description: 'Master essential Japanese phrases for your trip to Japan',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HX8VRMBP3T');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}