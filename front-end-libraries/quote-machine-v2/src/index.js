'use strict';

import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap';
import './main.scss';

function fetchQuote(onArrival) {
        fetch("http://api.quotable.io/random", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => ({
                text: res.content,
                author: res.author
            }
                         ))
            .then(onArrival);
    }

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: {
                text: "",
                author: "",
            },
            changeCount: 0,
            loading: true,
        }

        this.changeQuote = this.changeQuote.bind(this);
        this.newQuote = this.newQuote.bind(this);
    }

    componentDidMount() {
        this.newQuote();
    }

    changeQuote(newQuote) {
        this.setState((state) => ({
            quote: newQuote,
            changeCount: state.changeCount + 1
        }))
    }

    newQuote() {
        this.setState((state) => ({
            loading: true,
        }));
       fetchQuote((quote) => {
            this.changeQuote(quote);
            this.setState(() => ({
                loading: false
            }));
        });
    }

    render() {
        return (
            <div>
                <QuoteMachine quote={this.state.quote} changeCount={this.state.changeCount} loading={this.state.loading} newQuote={this.newQuote} />
                <Debug loading={this.state.loading} changeCount={this.state.changeCount} />
            </div>
        );
    }
}

class QuoteMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const quote = this.props.quote;
        return (
            <div id="quote-box" class="row min-vh-100 justify-content-center align-items-center">
                <div className="card shadow w-50 mb-3">
                    <div className="card-header">
                        <h4>Quote of the moment</h4>
                    </div>
                    <div className="card-body">
                        <blockquote className={`blockquote animated ${this.props.loading ? "fadeOut" : "fadeIn"}`} key={this.props.changeCount}>
                            <p id="text">"{quote.text}"</p>
                            <footer className="blockquote-footer"><cite id="author">{quote.author}</cite></footer>
                        </blockquote>
                    </div>
                    <div className="card-footer container">
                        <Tweet quote={quote.text} author={quote.author}/>
                        <button id="new-quote" onClick={this.props.newQuote} className="btn btn-primary float-end">Change quote</button>
                    </div>
                </div>
            </div>
        );
    }
}

class Tweet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <a
                   href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + this.props.quote + '" ') + this.props.author}`}
                   id="tweet-quote"
                   className="btn btn-secondary float-start">
                   <i className="fa fa-twitter"></i>
               </a>
    }
}

class Debug extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card fixed-bottom">
                <div className="card-header">
                    <h5>Debug</h5>
                </div>
                <div className="card-body">
                    <p>Loading: {this.props.loading.toString()}</p>
                    <p>Times changed: {this.props.changeCount}</p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

