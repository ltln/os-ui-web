"use client";

import styles from "./css/MenuBar.module.css";

import { IconBrandGithub, IconCalendar, IconClock, IconLogout, IconTerminal, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { config } from "../lib/config";
import { useCalendarState } from "./Calendar";
import { useTerminalState } from "./Terminal";

import Logo from "../assets/logo.png";
import mix from "../lib/class";
import { useClockState } from "./Clock";

export default function MenuBar() {
    const [terminalState, setTerminalState] = useTerminalState();
    const [calendarState, setCalendarState] = useCalendarState();
    const [clockState, setClockState] = useClockState();
    const [dropdown, setDropdown] = useState<boolean>(false);
    const { replace } = useRouter();

    useEffect(() => {
        setInterval(() => {
            if (typeof window == undefined) return;
            let now = new Date();
            let time = document.getElementById('time');
            let date = document.getElementById('date');
        
            if (time) time.innerText = now.toLocaleTimeString();
            if (date) date.innerText = now.toLocaleDateString();
        }, 500)
    }, []);

    function logout() {
        setDropdown(false);
        setTimeout(() => {
            replace('/logout');
        }, 1000)
    }

    return (
        <div id="menu-bar" onContextMenu={(e) => e.preventDefault()}>
            <div className={styles.menubar}>
                <div className="mr-4">
                    <Image src={Logo} alt="Logo" height={36} className="no-select-text cursor-pointer rounded-full hover:scale-110 duration-300" onClick={() => dropdown ? setDropdown(false) : setDropdown(true)} />
                </div>
                <div>
                    <span className="no-select-text">
                        <IconUser size={'14px'} className="mb-0.5 mr-1 text-green-700 inline-flex" />
                        { config.title }
                        <span className="ml-2 text-green-700">~</span>
                    </span>
                </div>
                <div className="ml-auto">
                    <span onClick={() => setTerminalState(true)}>
                        <IconTerminal size={'14px'} className="cursor-pointer mb-0.5 mr-1 text-green-700 inline-flex" />
                    </span>
                    <span className={styles.divider}>|</span>
                    <span className="no-select-text cursor-pointer" onClick={() => setCalendarState(true)}>
                        <IconCalendar size={'14px'} className="mb-0.5 mr-1 text-green-700 inline-flex" />
                        <span id="date">01/01/1970</span>
                    </span>
                    <span className={styles.divider}>|</span>
                    <span className="no-select-text cursor-pointer" onClick={() => setClockState(true)}>
                        <IconClock size={'14px'} className="mb-0.5 mr-1 text-green-700 inline-flex" />
                        <span id="time">00:00:00 AM</span>
                    </span>
                </div>
            </div>
            <div className={mix([styles.dropdown, dropdown ? 'block' : 'hidden'])} id="dropdown">
                <span className="flex cursor-pointer py-2 px-5 hover:bg-green-400" onClick={() => { setTerminalState(true); setDropdown(false);}}>
                    <IconTerminal size={20} className="mr-1" />
                    Terminal
                </span>
                <a href={config.github} target="_blank" className="flex py-2 px-5 hover:bg-green-400">
                    <IconBrandGithub size={20} className="mr-1" />
                    GitHub
                </a>
                <span className="flex cursor-pointer py-2 px-5 hover:bg-green-400" onClick={() => logout()}>
                    <IconLogout size={20} className="mr-1"/>
                    Logout
                </span>
            </div>
        </div>
    )
}