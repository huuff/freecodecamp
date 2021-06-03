export default function fetchFromQuotable(log, params) {
    let url = new URL("http://api.quotable.io/random");
    for (const param in params) {
        url.searchParams.append(param, params[param]);
    }

    log(`Fetching: ${url}`)
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            log(JSON.stringify(res));
            return {
                text: res.content,
                author: res.author,
                authorSlug: res.authorSlug,
                tags: res.tags,
            };
        })
}
