"use client";

import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import ReactClock from "react-clock";

import Draggable from "react-draggable";
import mix from "../lib/class";
import { useWindowState } from "../lib/window";
import styles from './css/Clock.module.css';
import './css/Clock.css';

const ClockContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => {}]);

export function ClockState({ children }: { children: ReactElement}) {
    const [clockState, setClockState] = useState<boolean>(false);
    return (
        <ClockContext.Provider value={[clockState, setClockState]}>{children}</ClockContext.Provider>
    )
}

export function useClockState() {
    return useContext(ClockContext);
}

export default function Clock({ state, setState }: { state: boolean, setState: Dispatch<SetStateAction<boolean>>}) {
    const [app, setApp] = useWindowState();
    const [value, setValue] = useState(new Date());
    const nodeRef = useRef(null);

    useEffect(() => {
        if (typeof window == undefined) return;
        const interval = setInterval(() => setValue(new Date()), 500);

        setInterval(() => {
            const timeText = document.getElementById('time-text');
            if (timeText) {
                timeText.innerText = (new Date()).toLocaleTimeString();
            }
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Draggable
            handle=".handle"
            bounds="parent"
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} id="clock" className={mix([styles.wrapper, state ? 'visible' : 'hidden' ,app.window == "clock" ? "activeWindow" : ""])} onClick={() => setApp({ window: 'clock' })}>
                <div className="flex handle text-black bg-white h-5 rounded-t-lg">
                    <div className="closeBtn" title="Close window" onClick={() => setState(false) }>
                        <div className="x" />
                    </div>
                    <span className="ml-auto mr-auto cursor-default no-select-text">Clock</span>
                </div>

                <div className={styles.body}>
                    <ReactClock className="m-auto mb-4" value={value} />
                    <p id="time-text" className="text-center">00:00:00</p>
                </div>
            </div>
        </Draggable>
    )
}
