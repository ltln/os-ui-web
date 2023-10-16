"use client";

import { Dispatch, ReactElement, SetStateAction, useContext, useState } from "react";
import { createContext } from "react";

interface Window {
    window: "terminal" | "calendar" | "clock" | null
}

const WindowContext = createContext<[Window, Dispatch<SetStateAction<Window>>]>([{ window: null }, () => {}]);

export function WindowState({ children }: { children: ReactElement }) {
    const [window, setWindow] = useState<Window>({ window: null });
    return (
        <WindowContext.Provider value={[window, setWindow]}>{children}</WindowContext.Provider>
    )
}

export function useWindowState() {
    return useContext(WindowContext);
}