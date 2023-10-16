"use client";

import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useRef, useState } from "react";
import ReactCalendar from "react-calendar";

import Draggable from "react-draggable";
import mix from "../lib/class";
import { useWindowState } from "../lib/window";
import './css/Calendar.css';
import styles from './css/Calendar.module.css';

const CalendarContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => {}]);

export function CalendarState({ children }: { children: ReactElement}) {
    const [calendarState, setCalendarState] = useState<boolean>(false);
    return (
        <CalendarContext.Provider value={[calendarState, setCalendarState]}>{children}</CalendarContext.Provider>
    )
}

export function useCalendarState() {
    return useContext(CalendarContext);
}

export default function Calendar({ state, setState }: { state: boolean, setState: Dispatch<SetStateAction<boolean>>}) {
    const [app, setApp] = useWindowState();
    const nodeRef = useRef(null);

    return (
        <Draggable
            handle=".handle"
            bounds="parent"
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} id="calendar" className={mix([styles.wrapper, state ? "visible" : "hidden", app.window == "calendar" ? "activeWindow" : ""])} onClick={() => setApp({ window: 'calendar' })}>
                <div className="flex handle text-black bg-white h-5 rounded-t-lg">
                    <div className="closeBtn" title="Close window" onClick={() => setState(false)}>
                        <div className="x" />
                    </div>
                    <span className="ml-auto mr-auto cursor-default no-select-text">Calendar</span>
                </div>
                <ReactCalendar />
            </div>
        </Draggable>
    )
}
