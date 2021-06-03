import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { setStatus } from './status-slice'
import { createSlice } from '@reduxjs/toolkit'

export const debugSlice = createSlice({
    name: "debug",
    initialState: {
        logs: []
    },
    reducers: {
        log: (state, action) => {
            state.logs = [...state.logs].concat(action.payload)
        }
    }
})

export const debugReducer = debugSlice.reducer
export const { log } = debugSlice.actions

// TODO: change arrow icon when uncollapsed
const iterableProps = (props) => {
    return Object.entries(props)
        .filter(([prop, val]) => prop !== "logs")
        .filter(([prop, val]) => typeof val !== "function")
}

const valToString = (val) => {
    if (val === undefined)
        return "undefined"
    if (typeof val === 'object')
        return JSON.stringify(val)
    else
        return val.toString()
}

export default function Debug(props) {
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
                        {iterableProps(props).map(([prop, val]) => <li key={prop}>{prop}: {valToString(val)}</li>)}
                    </ul>
                    <div id="log"> {/* Yes, I know the browser has a console */}
                        <textarea rows="5" id="console" value={props.logs.join("\n")} disabled={true} className="w-100 h-75 small"/>
                    </div>
                    <button onClick={() => props.changeStatus("ERROR")} className="btn btn-warning">Trigger error</button>
                </div>
            </div>
        </div>
    );
}

