import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

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
                   <FontAwesomeIcon icon={faTwitter} />
               </a>
    }
}
