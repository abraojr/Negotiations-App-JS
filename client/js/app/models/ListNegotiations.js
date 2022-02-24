class ListNegotiations {
    constructor(trap) {
        this._negotiations = [];
        this._trap = trap;
    }

    get negotiations() {
        return [].concat(this._negotiations);
    }

    add(negotiation) {
        this._negotiations.push(negotiation);
        this._trap(this);
    }

    empty() {
        this._negotiations = [];
        this._trap(this);
    }
}