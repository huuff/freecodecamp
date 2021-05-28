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
                authorSlug: "",
            },
            loading: true,
            interval: new ChangeInterval(this.randomQuote.bind(this), AUTO_CHANGE_TIME),
        };

        this.randomQuote = this.randomQuote.bind(this);
        this.authorQuote = this.authorQuote.bind(this);
        this.changeQuote = this.changeQuote.bind(this);
    }

    componentDidMount() {
        this.randomQuote();
    }

    changeQuote(response) {
        setTimeout( () => {
            this.setState(() => ({
                quote: response.quote,
                loading: false
            }));
        }, REFRESH_TIME - response.time);
    }

    //TODO: DRY both of these
    randomQuote() {
        this.setState((state) => ({
            loading: true,
        }));
        fetchQuote(this.changeQuote);
        this.state.interval.reset();
    }

    authorQuote() {
        this.setState((state) => ({
            loading: true,
        }));
        fetchQuote(this.changeQuote, this.state.quote.authorSlug);
        this.state.interval.reset();
    }

    render() {
        return (
            <div>
                <QuoteBox quote={this.state.quote} loading={this.state.loading} randomQuote={this.randomQuote} authorQuote={this.authorQuote} />
                <Debug loading={this.state.loading} quote={JSON.stringify(this.state.quote)}/>
            </div>
        );
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

