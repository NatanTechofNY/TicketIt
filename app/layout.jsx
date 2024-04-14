import NavBar from '../components/NavBar';
import {roboto} from './fonts';
import './globals.css';

export const metadata = {
    title: {
        default: 'Ticket It',
        template: '%s | Ticket It',
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="en" className={`${roboto.variable}`}>
        <body className="bg-white flex flex-col px-4 py-2 min-h-screen">
        <header>
            <NavBar/>
        </header>
        <main className="grow py-3">
            {children}
        </main>
        <footer className="border-t py-3 text-center text-slate-500 text-xs">
            Made with love by {''}
            <a href="https://github.com/NatanTechofNY" target="_blank"
               className="text-red-950 hover:underline">
                Natan
            </a>
        </footer>
        </body>
        </html>
    );
}
