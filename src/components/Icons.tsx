import styles from "./css/Icons.module.css";

import { IconBook, IconSettings, IconTerminal2 } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

import mix from "../lib/class";

export default function Icons({
    setTs
}: {
    setTs: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <>
            <div className={mix([styles.wrapper,"no-select-text"])} onDoubleClick={() => setTs(true)}>
                <IconTerminal2 size={40} className="m-auto text-green-500" />
                Terminal
            </div>
            <div className={mix([styles.wrapper,"no-select-text"])}>
                <IconSettings size={40} className="m-auto text-green-500" />
                Settings
            </div>          
            <div className={mix([styles.wrapper,"no-select-text"])}>
                <IconBook size={40} className="m-auto text-green-500" />
                Blog
            </div>
        </>
    )
}