'use strict';

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import _ from "lodash";

import 'bootstrap';
import './main.scss';

import Debug from "./debug.js";
import QuoteBox from "./quote-box.js";
import fetchQuote from "./fetch-quote.js";
import {STATUS} from "./status.js";

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
                this.requestQuote({});
            }, AUTO_CHANGE_TIME),
            logs: [],
            status: "OK",
            gotErrorRecently: false,
        };

        this.requestQuote = this.requestQuote.bind(this);
        this.changeQuote = this.changeQuote.bind(this);
        this.setStatus = this.setStatus.bind(this);
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
        if (_.isEqual(this.state.quote, response.quote)) {
            this.log("Unable to find quote matching criteria");
            this.setStatus("FETCHED_SAME");
        } else {
            this.setStatus("OK");
        }
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

    setStatus(newStatus) {
        this.setState((status) => ({
            status: newStatus,
            gotErrorRecently: newStatus !== "OK" ? true : false,
        }));

        if (newStatus !== "OK") {
            setTimeout(() => {
                this.setState(() => ({gotErrorRecently: false}));
            }, 5000);
        }
    }


    render() {
        return (
            <div>
                <CSSTransition
                    in={this.state.gotErrorRecently}
                    timeout={1000}
                    classNames="fade-effect"
                    mountOnEnter={true}
                >
                    <div
                        className="alert alert-danger position-fixed top-0 start-50 translate-middle-x"
                        style={{minWidth: "60%"}}
                    >
                        {STATUS[this.state.status]}
                    </div>
                </CSSTransition>

                <QuoteBox quote={this.state.quote} loading={this.state.loading} requestQuote={this.requestQuote} />
                <Debug
                    loading={this.state.loading}
                    quote={JSON.stringify(this.state.quote)}
                    logs={this.state.logs}
                    interval={this.state.interval}
                    status={this.state.status}
                    gotErrorRecently={this.state.gotErrorRecently}
                    setStatus={this.setStatus}
                />

            </div>
        );
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

