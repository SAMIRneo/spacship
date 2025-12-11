import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spaceship 3D | Interactive WebGL Demo',
  description: 'Démonstration interactive de vaisseau spatial en 3D avec Three.js et React Three Fiber',
  keywords: ['Three.js', 'WebGL', '3D', 'React', 'Next.js', 'Spaceship', 'Cyberpunk'],
  authors: [{ name: 'SAMIRneo' }],
  openGraph: {
    title: 'Spaceship 3D - Interactive WebGL Demo',
    description: 'Vaisseau spatial 3D interactif avec esthétique cyberpunk',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}