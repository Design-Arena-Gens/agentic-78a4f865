import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PC Performance Tweaks - FPS Boost & Network Optimizer',
  description: 'Optimize your PC for maximum FPS, low latency, and minimal ping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
