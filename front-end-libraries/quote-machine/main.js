'use strict';

const QUOTES = [
    {
        text: "Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.",
        author: "Friedrich Nietsche"
    },
    {
        text: "I do know that for the sympathy of one living being, I would make peace with all. I have love in me the likes of which you can scarcely imagine and rage the likes of which you would not believe. If I cannot satisfy the one, I will indulge the other.",
        author: "Mary Shelley, Frankenstein"
    },
    {
        text: 'People speak sometimes about the "bestial" cruelty of man, but that is terribly unjust and offensive to beasts, no animal could ever be so cruel as a man, so artfully, so artistically cruel.',
        author: "Fyodor Dostoyevsky"
    },
    {
        text: "The horror! The horror!",
        author: "Joseph Conrad, Heart of Darkness"
    },
    {
        text: "Every weirdo in the world is on my wavelength.",
        author: "Thomas Pynchon, Crying of Lot 49"

    },
    {
        text: "I have to remind myself to breathe -- almost to remind my heart to beat!",
        author: "Emily Brontë, Wuthering Heights"
    },
    {
        text: "Madness, mayhem, erotic vandalism, devastation of innumerable souls - while we scream and perish, History licks a finger and turns the page.",
        author: "Thomas Ligotti"
    },
    {
        text: "Space echoes like an immense tomb, yet the stars still burn. Why does the sun take so long to die ?",
        author: "Nick Land"
    }
];

class QuoteMachine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: this.#randomIndex()
        }

        this.changeQuote = this.changeQuote.bind(this);
    }

#randomIndex() {
    return Math.floor(Math.random() * QUOTES.length);
}

    changeQuote() {
        this.setState(() => ({
            index: this.#randomIndex()
        }));
        this.forceUpdate();
    }

    render() {
        const quote = QUOTES[this.state.index];
        return <div className="card shadow w-50 mb-3">
                    <div className="card-header">
                        <h4>Dark quote of the moment</h4>
                    </div>
                   <div className="card-body">
                       <blockquote className="blockquote animate__animated animate__fadeIn">
                           <p>"{quote.text}"</p>
                           <footer className="blockquote-footer"><cite>{quote.author}</cite></footer>
                       </blockquote>
                    </div>
                   <div className="card-footer">
                       <button onClick={this.changeQuote} className="btn btn-primary">Change quote</button>
                    </div>
               </div>
    }
}

ReactDOM.render(
    <QuoteMachine />,
    document.getElementById('quote-box')
);
