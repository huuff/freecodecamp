import React from 'react';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/brands'



export default class Tweet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <a
                   href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + this.props.quote + '" ') + this.props.author}`}
                   id="tweet-quote"
                   className="btn btn-secondary float-start">
                   <i className="fab fa-twitter"></i>
               </a>
    }
}
