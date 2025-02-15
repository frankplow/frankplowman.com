import '../styles/global.css'
import { ThemeSwitcher } from '@/lib/dark_mode.js'

export const metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://www.frankplowman.com",
    types: {
      "application/atom+xml": "https://www.frankplowman.com/feed.xml",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  )
}
