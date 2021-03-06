import React from 'react';
import Tweet from './twitter.js';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux'

export default function QuoteBox(props) {

    return (
        <div id="quote-box" className="row min-vh-100 justify-content-center align-items-center">
            <div className="card shadow w-50 mb-3">
                <div className="card-header">
                    <h4>Quote of the moment</h4>
                </div>
                <div className="card-body">

                    <CSSTransition
                        in={props.showQuote}
                        timeout={1000}
                        classNames="fade-effect"
                        appear={true}
                    >
                        {
                            props.quote.text !== ""
                                ? <blockquote className="blockquote">
                                      <p id="text" data-testid="quote-text">"{props.quote.text}"</p>
                                      <footer className="blockquote-footer"><cite id="author" data-testid="quote-author">{props.quote.author}</cite></footer>
                                  </blockquote>
                            : <div className="d-flex justify-content-center my-5">
                                  <div className = "spinner-border text-primary" style={{width: "3rem", height: "3rem"}}></div>
                              </div>
                        }

                    </CSSTransition>
                </div>
                <div className="card-footer">
                    <Tweet quote={props.quote.text} author={props.quote.author} />
                    <button
                        id="author-quote"
                        onClick={() => props.requestQuote({ 'author': props.quote.authorSlug })}
                        className="btn btn-primary float-end ms-2">
                        Quote from this author
                    </button>
                    <button
                        id="new-quote"
                        onClick={() => props.requestQuote({})}
                        className="btn btn-primary float-end ms-2">
                        Random quote
                    </button>
                </div>
                <div data-testid="tags-container">
                    {
                        props.quote.tags.map((tag, index) => (
                            <a
                                className="me-3 link-primary"
                                key={tag+index}
                                onClick={() => props.requestQuote( {tags: [tag]} )}
                                style={{ cursor:'pointer' }}
                            >
                                {tag}
                            </a>))  }
                </div>
            </div>
        </div>
    );
}
