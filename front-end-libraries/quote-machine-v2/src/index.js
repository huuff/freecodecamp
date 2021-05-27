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
            changeCount: 0
        }

        this.changeQuote = this.changeQuote.bind(this);
    }

    componentDidMount() {
        this.changeQuote();
    }

    changeQuote() {
        fetch("http://api.quotable.io/random", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState((state) => ({
                    quote: {
                        text: result.content,
                        author: result.author,
                    },
                    changeCount: state.changeCount + 1
                }))
            })
    }

    render() {
        const quote = this.state.quote;
        return <div className="card shadow w-50 mb-3">
                   <div className="card-header">
                       <h4>Dark quote of the moment</h4>
                   </div>
                   <div className="card-body">
                       <blockquote className="blockquote animate__animated animate__fadeIn" key={this.state.changeCount}>
                           <p id="text">"{quote.text}"</p>
                           <footer className="blockquote-footer"><cite id="author">{quote.author}</cite></footer>
                       </blockquote>
                   </div>
                   <div className="card-footer container">
                       <Tweet quote={quote.text} author={quote.author}/>
                       <button id="new-quote" onClick={this.changeQuote} className="btn btn-primary float-end">Change quote</button>
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

