import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// TODO: The state is only to manage the shown arrow, is there any better way?

export default class Debug extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: true
        };

        this.changeVisibility = this.changeVisibility.bind(this);
        this.iterableProps = this.iterableProps.bind(this);
    }

    changeVisibility() {
        this.setState((state) => ({
            hidden: !state.hidden
        }))
    }

    iterableProps() {
        return Object.entries(this.props).filter(([prop, val]) => prop !== "logs");
    }

    render() {
        return (
            <div className="card fixed-bottom shadow w-25 ms-3">
                <div className="card-header row align-items-center">
                    <h5 className="col-10">Debug</h5>
                    <button id="toggle-debug" className="float-end col btn" data-bs-toggle="collapse" href="#debug-body" onClick={this.changeVisibility}>
                        <FontAwesomeIcon icon={this.state.hidden ? faArrowUp : faArrowDown}/>
                    </button>
            </div>
            <div id="debug-body" className="collapse">
                <div className="card-body px-3">
                    <ul>
                        {this.iterableProps().map(([prop, val]) => <li key={prop}>{prop}: {val.toString()}</li>)}
                    </ul>
                    <div id="log"> {/* Yes, I know the browser has a console */}
                        <textarea rows="5" id="console" value={this.props.logs.join("\n")} disabled={true} className="w-100 h-75 small"/>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
