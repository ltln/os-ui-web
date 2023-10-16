import { JetBrains_Mono } from 'next/font/google';

import './globals.css';
import { CalendarState } from '../components/Calendar';
import { ClockState } from '../components/Clock';
import { TerminalState } from '../components/Terminal';
import { config } from '../lib/config';
import { WindowState } from '../lib/window';

const jb_Mono = JetBrains_Mono({
    subsets: ['latin','vietnamese'],
    display: 'swap',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <head>
                <title>{config.title}</title>
            </head>
            <WindowState>
            <TerminalState>
            <CalendarState>
            <ClockState>
            <html lang="en" className={jb_Mono.className}>
                <body>
                    {children}
                </body>
            </html>
            </ClockState>
            </CalendarState>
            </TerminalState>
            </WindowState>
        </>
    )
}