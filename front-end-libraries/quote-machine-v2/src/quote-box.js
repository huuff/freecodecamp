import React from 'react';
import Tweet from './twitter.js';

export default class QuoteMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const quote = this.props.quote;
        return (
            <div id="quote-box" className="row min-vh-100 justify-content-center align-items-center">
                <div className="card shadow w-50 mb-3">
                    <div className="card-header">
                        <h4>Quote of the moment</h4>
                    </div>
                    <div className="card-body">
                        <blockquote className={`blockquote animated ${this.props.loading ? "fadeOut" : "fadeIn"} slow`} key={this.props.changeCount}>
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
