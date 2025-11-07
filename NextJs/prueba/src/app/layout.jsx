import './globals.css'
import Navbar from '@/components/Navbar'
import { Roboto } from 'next/font/google'

export const metadata = {
    title: 'My App',
    description: 'Esta es mi aplicación',
    keywords: "nextjs, react, web"
}

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    style: ["italic", "normal"],
    subsets: ["latin"]
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={roboto.className}>
        <Navbar />
        {children}
        </body>
        </html>
    )
}
