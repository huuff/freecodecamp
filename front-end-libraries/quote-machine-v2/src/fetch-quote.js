export default function fetchQuote(onArrival) {
    const startTime = Date.now();
    fetch("http://api.quotable.io/random", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => ({
            quote: {
                text: res.content,
                author: res.author
            },
            time: Date.now() - startTime
        }))
        .then(onArrival);
}
