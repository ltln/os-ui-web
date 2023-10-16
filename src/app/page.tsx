'use client';

import Calendar, { useCalendarState } from '../components/Calendar';
import Clock, { useClockState } from '../components/Clock';
import MenuBar from '../components/MenuBar';
import Terminal, { useTerminalState } from '../components/Terminal';
import { config } from '../lib/config';

export default function Home() {
    const [terminalState, setTerminalState] = useTerminalState();
    const [calendarState, setCalendarState] = useCalendarState();
    const [clockState, setClockState] = useClockState();

    return (
        <>
            {/* <Icons 
                setTs={setTerminalState} // Will fix later
            /> */}
            <div className="wrapper" style={{ backgroundImage: config.background }} />
            <MenuBar />
            <div className="desktop" onContextMenu={(e) => e.preventDefault()}>
                <Terminal state={terminalState} setState={setTerminalState} />
                <Calendar state={calendarState} setState={setCalendarState} />
                <Clock state={clockState} setState={setClockState} />
                <noscript>
                <div className="m-auto" style={{ width: '300px', height: '300px' }}>
                    <div className="flex handle text-black bg-white h-5 rounded-t-lg">
                        <span className="ml-auto mr-auto cursor-default no-select-text">Alert</span>
                    </div>
                    <div className="px-10 py-8 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                        <p>Please enable Javascript to visit this website.</p>
                        <br />
                    </div>
                </div>
                </noscript>
            </div>
        </>
    )
}