'use strict';

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import _ from "lodash";

import 'bootstrap';
import './main.scss';

import Debug from "./debug.js";
import { log } from "./debug"
import QuoteBox from "./quote-box.js";
import fetchFromQuotable from "./fetch-from-quotable.js";
import {StatusAlert, changeStatus} from "./status.js";

// Redux
import store from './store.js';
import { Provider } from 'react-redux';
import { setQuote } from './quote-slice';

import { useSelector } from 'react-redux'
import { showError, showQuote } from './visual';

import ChangeQuoteInterval from './interval'
import { fakeInterval } from './interval'

var interval = fakeInterval;

const changeQuote = (response) => {
        if (_.isEqual(store.getState().quote, response.quote)) {
            store.dispatch(log("Unable to find quote matching criteria"))
            changeStatus("FETCHED_SAME");
        } else {
            changeStatus("OK");
        }

        store.dispatch(setQuote(response.quote))
    }

// maybe a better name for fetchFunction and fetchQuote?
const requestQuote = (params, fetchQuote = fetchFromQuotable) => {
        showQuote()
    setTimeout( () => {
        fetchQuote((msg) => store.dispatch(log(msg)), params).then(changeQuote)
    }, 500 ) //to prevent the quote from being changed while vanishing
        interval.reset();
    }


const Main = (props) => {
    useEffect(() => {
        requestQuote({});
        interval = new ChangeQuoteInterval(() => {
            store.dispatch(log('Triggered interval'));
            requestQuote({});
        })
    }, [])

    const status = useSelector((state) => state.status)
    const quote = useSelector((state) => state.quote)
    const visual = useSelector((state) => state.visual)
    const debug = useSelector((state) => state.debug)

        return (
            <div>
                <StatusAlert code={status.code} showError={visual.showError}/>
                <QuoteBox quote={quote} showQuote={visual.showQuote} requestQuote={() => requestQuote(props.fetchQuote)} />
                <Debug
                    logs={debug.logs}
                    changeStatus={changeStatus}
                    status={status}
                    visual={visual}
                />
            </div>
        );
}


ReactDOM.render(
    <Provider store={store}>
        <Main fetchQuote={fetchFromQuotable}/>
    </Provider>,
    document.getElementById('root')
);

