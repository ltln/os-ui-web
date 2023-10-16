"use client";

import Draggable from "react-draggable";
import styles from "./css/Terminal.module.css";
import { Dispatch, KeyboardEvent, ReactElement, SetStateAction, createContext, useContext, useRef, useState } from "react";
import mix from "../lib/class";
import { prompt_history, terminal_prompts } from "../lib/prompt";
import { useWindowState } from "../lib/window";

const TerminalContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => {}]);

export function TerminalState({ children }: { children: ReactElement}) {
    const [terminalState, setTerminalState] = useState<boolean>(false);
    return (
        <TerminalContext.Provider value={[terminalState, setTerminalState]}>{children}</TerminalContext.Provider>
    )
}

export function useTerminalState() {
    return useContext(TerminalContext);
}

export default function Terminal({ state, setState }: { state: boolean, setState: Dispatch<SetStateAction<boolean>> }) {
    const [prompt, setPrompt] = useState<string | null>(null);
    const [app, setApp] = useWindowState();
    const nodeRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        if (inputRef.current) {
            setPrompt(inputRef.current.value);
        }
    }

    let history_count = -1;

    function keyboardEvent(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") executePrompt();

        if (e.key == "ArrowUp") {
            history_count == -1 ? history_count = prompt_history.length - 1 : history_count--;
            console.log(history_count);
            setPrompt(prompt_history[history_count]);
        }

        if (e.key == "ArrowDown") {
            history_count != -1 && history_count < prompt_history.length - 1 ? history_count++ : history_count = -1;
            setPrompt(history_count == -1 ? null : prompt_history[history_count]);
        }
    }

    async function executePrompt() {
        if (!document) return;

        const term = document.getElementById("term");
        if (!term) return;

        if (prompt == null || prompt == "") {
            term.insertAdjacentHTML('beforeend',`<p><span class="text-green-700">~ ></span></p>`);
            document.getElementById('term-body')?.scrollTo(0, term.scrollHeight);
            return;
        }

        term.insertAdjacentHTML('beforeend',`<p><span class="text-green-700">~ ></span> `+ prompt +`</p>`);
        prompt_history.push(prompt);
        const cmd_args = prompt.trim().toLowerCase().split(" ");
        const cmd = terminal_prompts[cmd_args[0] as keyof typeof terminal_prompts];
        setPrompt(null);
        if (!cmd) {
            term.insertAdjacentHTML('beforeend',`<p class="text-red-500">Unknown command. Type 'help' for help.</p>`);
        } else {
            const result = await cmd.exec(cmd_args.slice(1));
            if (result != "") {
                term.insertAdjacentHTML('beforeend', result); 
            }
        }
        document.getElementById('term-body')?.scrollTo(0, term.scrollHeight);
    }

    function focusTerminal() {
        setApp({ window: 'terminal' });
        document.getElementById('prompt-input')?.focus();
    }

    function closeTerminal() {
        setState(false);
        setApp({ window: null });
        const term = document.getElementById('term');
        if (term) {
            term.innerHTML = "";
        }
    }

    return (
        <Draggable
            handle=".handle"
            bounds="parent"
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} id="terminal" className={mix([styles.wrapper, state ? "visible" : "hidden", app.window == "terminal" ? "activeWindow" : ""])} onClick={() => focusTerminal()}>
                <div className="flex handle text-black bg-white h-5 rounded-t-lg">
                    <div className="closeBtn" title="Close window" onClick={() => closeTerminal() }>
                        <div className="x" />
                    </div>
                    <span className="ml-auto mr-auto cursor-default no-select-text">Terminal</span>
                </div>
                <div className={mix([styles.body, "terminal"])} id="term-body">
                    <p>Terminal v1.0/WebDev</p>
                    <p>Copyright (C) <a href="https://github.com/ltln" target="_blank">Ty Nguyen @ltln</a>. All rights reserved.</p>
                    <br />
                    <div id="term" />
                    <p>
                        <span className="text-green-700">{'~ >'}</span>
                        <input id="prompt-input" type="text" maxLength={100} ref={inputRef} onChange={handleChange} value={prompt ? prompt : ""} onKeyUp={(e) => keyboardEvent(e) } className={styles.prompt} />
                    </p>
                </div>
            </div>
        </Draggable>
    )
}