import React from "react";

export default class Debug extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: true
        }

    }

    render() {
        return (
            <div className="card fixed-bottom shadow w-25 ms-3">
                <div className="card-header row align-items-center">
                    <h5 className="col-10">Debug</h5>
                    <button id="toggle-debug" key={"hidden_" + this.state.hidden.toString()} className="float-end col btn" data-bs-toggle="collapse" href="#debug-body">
                        <i ref={this.toggleRef} className="fas fa-arrow-down"/>
                    </button>
                </div>
                <div id="debug-body" className="card-body" class="collapse px-3">
                    <ul>
                        {Object.entries(this.props).map(([prop, val]) => <li key={prop}>{prop}: {val.toString()}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}
