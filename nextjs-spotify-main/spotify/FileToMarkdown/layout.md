import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const metadata = {
title: "Spotify Taste Mixer",
description: "Genera playlists personalizadas basadas en tus gustos",
};

export default function RootLayout({ children }) {
return (
<html lang="es">
<body
className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212]`}
>
{children}
</body>
</html>
);
}
