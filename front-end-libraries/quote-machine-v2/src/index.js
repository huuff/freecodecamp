'use strict';

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import 'bootstrap';
import './main.scss';

import Debug from "./debug.js";
import QuoteMachine from "./quote-box.js";
import fetchQuote from "./fetch-quote.js";

const REFRESH_TIME = 1000;
const AUTO_CHANGE_TIME = 15000;

class ChangeInterval {
    constructor(func, time) {
        this.func = func;
        this.time = time;
        this.interval = setInterval(this.func, this.time);
    }

    reset() {
        clearInterval(this.interval);
        this.interval = setInterval(this.func, this.time);
    }

}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: {
                text: "",
                author: "",
            },
            loading: true,
            interval: new ChangeInterval(this.newQuote.bind(this), AUTO_CHANGE_TIME),
        };

        this.newQuote = this.newQuote.bind(this);
    }

    componentDidMount() {
        this.newQuote();
    }

    newQuote() {
        this.setState((state) => ({
            loading: true,
        }));
        fetchQuote((response) => {
            setTimeout( () => {
                this.setState(() => ({
                    quote: response.quote,
                    loading: false
                }));
            }, REFRESH_TIME - response.time); // This is specific to the fading out and fading in rendering effect I want
            // so I should look into a way of putting it into the component
        });
        this.state.interval.reset();
    }

    render() {
        return (
            <div>
                <QuoteMachine quote={this.state.quote} loading={this.state.loading} newQuote={this.newQuote} />
                <Debug loading={this.state.loading} />
            </div>
        );
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

