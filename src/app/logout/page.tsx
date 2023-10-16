"use client";

import Draggable from 'react-draggable';
import { config } from '../../lib/config';
import '../globals.css';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const nodeRef = useRef(null);
    const { replace } = useRouter();

    return (
        <>  
            <head>
                <title>{config.title}</title>
            </head>
            <body className="flex items-center justify-center">
                <div className="wrapper" style={{ backgroundImage: config.background, filter: 'blur(10px)' }} />
                <Draggable
                    handle=".handle"
                    bounds="parent"
                    nodeRef={nodeRef}
                >
                    <div ref={nodeRef} id="box">
                        <div className="flex handle text-black bg-white h-5 rounded-t-lg">
                            <div className="closeBtn" title="Close window">
                                <div className="x" />
                            </div>
                            <span className="ml-auto mr-auto cursor-default no-select-text">Alert</span>
                        </div>
                        <div className="px-10 py-8 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                            <p>It is now safe to close this tab.</p>
                            <br />
                            <button className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-800 text-white" onClick={() => replace("/")}>Revisit</button>
                        </div>
                    </div>
                </Draggable>
            </body>
        </>
    )
}