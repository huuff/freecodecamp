export default function fetchQuote(onArrival, authorSlug) {
    let url = new URL("http://api.quotable.io/random");
    if (authorSlug !== undefined) {
        url.searchParams.append("author", authorSlug);
    }

    const startTime = Date.now();
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => ({
            quote: {
                text: res.content,
                author: res.author,
                authorSlug: res.authorSlug,
            },
            time: Date.now() - startTime
        }))
        .then(onArrival);
}
