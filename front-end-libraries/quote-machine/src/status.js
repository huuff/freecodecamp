import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { useSelector} from 'react-redux'

export const STATUS_STRING = {
    OK: "This string shouldn't appear anywhere",
    FETCHED_SAME: "Oops! Seems like I wasn't able to retrieve a quote matching that criteria",
    ERROR: "A generic error occurred",
};

export default function StatusAlert() {
    const status = useSelector((state) => state.status)
    const showError = (useSelector((state) => state.visual)).showError

    return (<CSSTransition
                    in={showError}
                    timeout={1000}
                    classNames="fade-effect"
                    mountOnEnter={true}
                >
                    <div
                        className="alert alert-danger position-fixed top-0 start-50 translate-middle-x"
                        style={{minWidth: "60%"}}
                    >
                        {STATUS_STRING[status.code]}
                    </div>
            </CSSTransition>)
}
