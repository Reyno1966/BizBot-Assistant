import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "BizBot Assistant | El Cerebro de tu Negocio",
    description: "Gestiona citas, facturas y contabilidad con inteligencia artificial.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#0f1115" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            </head>
            <body className={`${inter.className} bg-[#0f1115]`}>
                {children}
            </body>
        </html>
    );
}
