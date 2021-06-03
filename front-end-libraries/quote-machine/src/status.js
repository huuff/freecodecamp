import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { useSelector} from 'react-redux'

import store from './store.js'
import {setStatus} from './status-slice'
import {showError} from './visual'

export const STATUS_STRING = {
    OK: "This string shouldn't appear anywhere",
    FETCHED_SAME: "Oops! Seems like I wasn't able to retrieve a quote matching that criteria",
    ERROR: "A generic error occurred",
};

export const changeStatus = (code) => {
        store.dispatch(setStatus({ code: code}))

        if (code !== "OK") {
            showError()
        }
    }

export const StatusAlert = (props) => {

    return (<CSSTransition
                    in={props.showError}
                    timeout={1000}
                    classNames="fade-effect"
                    mountOnEnter={true}
                >
                    <div
                        className="alert alert-danger position-fixed top-0 start-50 translate-middle-x"
                        style={{minWidth: "60%"}}
                    >
                        {STATUS_STRING[props.code]}
                    </div>
            </CSSTransition>)
}
