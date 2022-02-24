class ListNegotiations {
    constructor(context, trap) {
        this._negotiations = [];
        this._context = context;
        this._trap = trap;
    }

    get negotiations() {
        return [].concat(this._negotiations);
    }

    add(negotiation) {
        this._negotiations.push(negotiation);
        Reflect.apply(this._trap, this._context, [this]);
    }

    empty() {
        this._negotiations = [];
        Reflect.apply(this._trap, this._context, [this]);
    }
}