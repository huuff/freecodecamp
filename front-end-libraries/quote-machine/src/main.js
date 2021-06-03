'use strict';

import React, { useEffect } from "react";
import _ from "lodash";

// Redux actions
import { log } from "./debug"
import { setQuote } from './quote-slice'

import Debug from "./debug.js";
import QuoteBox from "./quote-box.js";
import {StatusAlert, changeStatus} from "./status.js";

import store from './store.js';

import { useSelector } from 'react-redux'
import { showError, showQuote } from './visual';

import ChangeQuoteInterval from './interval'
import { fakeInterval } from './interval'

import { connect } from 'react-redux'

var interval = fakeInterval;

export class Main extends React.Component {
    constructor(props) {
        super(props)

        this.requestQuote = this.requestQuote.bind(this)
        this.changeQuote = this.changeQuote.bind(this)
    }

    componentDidMount() {
        this.requestQuote();
        interval = new ChangeQuoteInterval(() => {
            this.props.log('Triggered interval');
            this.requestQuote();
        })

    }
    changeQuote(response) {
        const previousQuote = store.getState().quote; //get rid of this

        if (_.isEqual(previousQuote, response)) {
            this.props.log("Unable to find quote matching criteria")
            changeStatus("FETCHED_SAME");
        } else {
            changeStatus("OK");
        }

        this.props.setQuote(response)
    }

    requestQuote(params = {}) {
        showQuote()
        setTimeout( () => {
            this.props.fetchQuote(this.props.log, params).then(this.changeQuote)
        }, this.props.waitTime ) //to prevent the quote from being changed while vanishing
        interval.reset();
    }

    render() {
        return (
            <div>
                <StatusAlert
                    code={this.props.status.code}
                    showError={this.props.visual.showError}
                />
                <QuoteBox
                    quote={this.props.quote}
                    showQuote={this.props.visual.showQuote}
                    requestQuote={this.requestQuote} />
                <Debug
                    logs={this.props.debug.logs}
                    changeStatus={this.props.changeStatus}
                    status={this.props.status}
                    visual={this.props.visual}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.status,
    quote: state.quote,
    visual: state.visual,
    debug: state.debug
})

export default connect(mapStateToProps, { log, setQuote })(Main)
