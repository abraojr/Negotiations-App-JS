class ListNegotiations {
    constructor() {
        this._negotiations = [];
    }

    get negotiations() {
        return [].concat(this._negotiations);
    }

    add(negotiation) {
        this._negotiations.push(negotiation);
    }

    empty() {
        this._negotiations = [];
    }

    sortBy(criterion) {
        this._negotiations.sort(criterion);
    }

    invertSortBy() {
        this._negotiations.reverse();
    }
}