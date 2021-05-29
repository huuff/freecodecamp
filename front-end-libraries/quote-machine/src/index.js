'use strict';

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import 'bootstrap';
import './main.scss';

import Debug from "./debug.js";
import QuoteBox from "./quote-box.js";
import fetchQuote from "./fetch-quote.js";

const REFRESH_TIME = 1000;
const AUTO_CHANGE_TIME = 15000;

class ChangeInterval {
    constructor(func, time) {
        this.func = func;
        this.time = time;
        this.intervalId = setInterval(this.func, this.time);
    }

    reset() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.func, this.time);
    }

}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: {
                text: "",
                author: "",
                authorSlug: "",
                tags: [],
            },
            loading: true,
            interval: new ChangeInterval(() => {
                this.log('Triggered interval');
                this.randomQuote();
            }, AUTO_CHANGE_TIME),
            logs: [],
        };

        this.requestQuote = this.requestQuote.bind(this);
        this.changeQuote = this.changeQuote.bind(this);
        this.log = this.log.bind(this);
    }

    componentDidMount() {
        this.requestQuote({});
    }

    changeQuote(response) {
        setTimeout( () => {
            this.setState(() => ({
                quote: response.quote,
                loading: false
            }));
        }, REFRESH_TIME - response.time);
    }

    requestQuote(params) {
        this.setState((state) => ({
            loading: true,
        }));
        fetchQuote(this.changeQuote, this.log, params);
        this.state.interval.reset();
    }

    log(message) {
        this.setState((state) => ({
            logs: [...state.logs].concat(message)
        }));
    }

    render() {
        return (
            <div>
                <QuoteBox quote={this.state.quote} loading={this.state.loading} requestQuote={this.requestQuote} />
                <Debug loading={this.state.loading} quote={JSON.stringify(this.state.quote)} logs={this.state.logs} interval={this.state.interval} />
            </div>
        );
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

