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
import StatusAlert from "./status.js";

// Redux
import store from './store.js';
import { Provider } from 'react-redux';
import {changeQuote} from './quote-slice';
import {setStatus, setRecentError} from './status-slice'

import { showError } from './visual';


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
            loading: true,
            interval: new ChangeInterval(() => {
                this.log('Triggered interval');
                this.requestQuote({});
            }, AUTO_CHANGE_TIME),
            logs: [],
        };

        this.requestQuote = this.requestQuote.bind(this)
        this.changeQuote = this.changeQuote.bind(this)
        this.setStatus = this.setStatus.bind(this)
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
            store.dispatch(changeQuote(response.quote))
        }, REFRESH_TIME - response.time);


        if (_.isEqual(store.getState().quote, response.quote)) {
            this.log("Unable to find quote matching criteria");
            this.setStatus("FETCHED_SAME");
        } else {
            this.setStatus("OK");
        }
    }

    setStatus(code) {
        store.dispatch(setStatus({ code: code}))

        if (code !== "OK") {
            showError()
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

    render() {
        return (
            <div>
                <StatusAlert />
                <QuoteBox loading={this.state.loading} requestQuote={this.requestQuote} />
                <Debug
                    logs={this.state.logs}
                    interval={this.state.interval}
                    setStatus={this.setStatus}
                />
            </div>
        );
    }
}


ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);

