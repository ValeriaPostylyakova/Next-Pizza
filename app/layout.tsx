import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="ru">
            <head>
                <link rel="icon" href="/logo.png" />
            </head>
            <body className={nunito.variable}>
                <Toaster />
                {children}
            </body>
        </html>
    );
}
