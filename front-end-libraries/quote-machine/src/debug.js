import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { setStatus } from './status-slice'
import { useSelector, useDispatch } from 'react-redux'

// TODO: change arrow icon when uncollapsed
const iterableProps = (props) => {
    return Object.entries(props).filter(([prop, val]) => prop !== "logs");
}

export default function Debug(props) {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.status)
    const watched = {
        recentError: status.recentError,
    }

    return (
        <div className="card fixed-bottom shadow w-25 ms-3">
            <div className="card-header row align-items-center">
                <h5 className="col-10">Debug</h5>
                <button id="toggle-debug" className="float-end col btn" data-bs-toggle="collapse" href="#debug-body">
                    <FontAwesomeIcon icon={faArrowUp}/>
                </button>
            </div>
            <div id="debug-body" className="collapse">
                <div className="card-body px-3">
                    <ul>
                        {iterableProps(watched).map(([prop, val]) => <li key={prop}>{prop}: {val === undefined ? "undefined" : val.toString()}</li>)}
                    </ul>
                    <div id="log"> {/* Yes, I know the browser has a console */}
                        <textarea rows="5" id="console" value={props.logs.join("\n")} disabled={true} className="w-100 h-75 small"/>
                    </div>
                    <button onClick={() => props.setStatus("ERROR")} className="btn btn-warning">Trigger error</button>
                </div>
            </div>
        </div>
    );
}
