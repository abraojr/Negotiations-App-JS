class HttpService {
    get(url) {
        return fetch(url).then(res => this._handlerErrors(res)).then(res => res.json());
    }

    post(url, data) {
        return fetch(url, {
            headers: { "Content-type": "application/json" },
            method: "post",
            body: JSON.stringify(data)
        })
            .then(res => this._handlerErrors(res));
    }

    _handlerErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }
}