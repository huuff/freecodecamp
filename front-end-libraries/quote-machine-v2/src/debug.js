import React from "react";

export default class Debug extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card fixed-bottom shadow ms-3 w-25">
                <div className="card-header">
                    <h5>Debug</h5>
                </div>
                <div className="card-body">
                    <ul>
                        {Object.entries(this.props).map(([prop, val]) => <li key={prop}>{prop}: {val.toString()}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}
