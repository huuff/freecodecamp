'use strict';

import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap';
import './main.scss';

class QuoteMachine extends React.Component {
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

        this.newQuote = this.newQuote.bind(this);
        this.getQuote = this.getQuote.bind(this);
        this.changeQuote = this.changeQuote.bind(this);
    }

    componentDidMount() {
        this.newQuote();
    }

    getQuote(onArrival) {
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

    changeQuote(newQuote) {
        console.log(newQuote);
        this.setState((state) => ({
            quote: newQuote,
            changeCount: state.changeCount + 1
        }))
    }

    newQuote() {
        this.setState((state) => ({
            loading: true,
        }));
        this.getQuote((quote) => {
            this.changeQuote(quote);
            this.setState(() => ({
                loading: false
            }));
        });
    }

    render() {
        const quote = this.state.quote;
        return <div className="card shadow w-50 mb-3">
                   <div className="card-header">
                       <h4>Status: {this.state.loading.toString()}</h4>
                   </div>
                   <div className="card-body">
                       <blockquote className={`blockquote animated ${this.state.loading ? "fadeOut" : "fadeIn"}`} key={this.state.changeCount}>
                           <p id="text">"{quote.text}"</p>
                           <footer className="blockquote-footer"><cite id="author">{quote.author}</cite></footer>
                       </blockquote>
                   </div>
                   <div className="card-footer container">
                       <Tweet quote={quote.text} author={quote.author}/>
                       <button id="new-quote" onClick={this.newQuote} className="btn btn-primary float-end">Change quote</button>
                   </div>
               </div>
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

ReactDOM.render(
    <QuoteMachine />,
    document.getElementById('quote-box')
);

