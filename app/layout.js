import '../styles/global.css'
import { ThemeSwitcher } from '@/lib/dark_mode.js'

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
