import React from 'react';
import Tweet from './twitter.js';

export default class QuoteBox extends React.Component {
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
                        {
                            quote.text !== ""
                            ? <blockquote className={`blockquote animated ${this.props.loading ? "fadeOut" : "fadeIn"} slow`}>
                                <p id="text">"{quote.text}"</p>
                                <footer className="blockquote-footer"><cite id="author">{quote.author}</cite></footer>
                            </blockquote>
                            : <div className="d-flex justify-content-center my-5">
                                  <div className = "spinner-border text-primary" style={{width: "3rem", height: "3rem"}}></div>
                              </div>
                        }
                    </div>
                    <div className="card-footer">
                        <Tweet quote={quote.text} author={quote.author} />
                        <button id="author-quote" onClick={this.props.authorQuote} className="btn btn-primary float-end ms-2">Quote from this author</button>
                        <button id="new-quote" onClick={this.props.randomQuote} className="btn btn-primary float-end ms-2">Random quote</button>
                    </div>
                </div>
            </div>
        );
    }
}
