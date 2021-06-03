'use strict';

import React, { useEffect } from "react";
import _ from "lodash";

import Debug from "./debug.js";
import { log } from "./debug"
import QuoteBox from "./quote-box.js";
import {StatusAlert, changeStatus} from "./status.js";

import store from './store.js';
import { setQuote } from './quote-slice';

import { useSelector } from 'react-redux'
import { showError, showQuote } from './visual';

import ChangeQuoteInterval from './interval'
import { fakeInterval } from './interval'

var interval = fakeInterval;

const changeQuote = (response) => {
    const previousQuote = store.getState().quote;

        if (_.isEqual(previousQuote, response)) {
            store.dispatch(log("Unable to find quote matching criteria"))
            changeStatus("FETCHED_SAME");
        } else {
            changeStatus("OK");
        }

        store.dispatch(setQuote(response))
    }

const requestQuote = (fetchQuote, timeToWait, params = {}) => {
    showQuote()
    setTimeout( () => {
        fetchQuote((msg) => store.dispatch(log(msg)), params).then(changeQuote)
    }, timeToWait ) //to prevent the quote from being changed while vanishing
        interval.reset();
    }


export default function Main(props) {
    useEffect(() => {
        requestQuote(props.fetchQuote, 0);
        interval = new ChangeQuoteInterval(() => {
            store.dispatch(log('Triggered interval'));
            requestQuote(props.fetchQuote, props.waitTime);
        })
    }, [])

    const status = useSelector((state) => state.status)
    const quote = useSelector((state) => state.quote)
    const visual = useSelector((state) => state.visual)
    const debug = useSelector((state) => state.debug)

        return (
            <div>
                <StatusAlert code={status.code} showError={visual.showError}/>
                <QuoteBox quote={quote} showQuote={visual.showQuote} requestQuote={(param) => requestQuote(props.fetchQuote, props.waitTime, param)} />
                <Debug
                    logs={debug.logs}
                    changeStatus={changeStatus}
                    status={status}
                    visual={visual}
                />
            </div>
        );
}
