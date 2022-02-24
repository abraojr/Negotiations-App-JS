class NegotiationController {

    constructor() {
        let self = this;
        let $ = document.querySelector.bind(document);
        this._inputDate = $("#date");
        this._inputQuantity = $("#quantity");
        this._inputValue = $("#value");

        this._listNegotiations = new Proxy(new ListNegotiations(), {
            get(target, prop, receiver) {
                if (["add", "empty"].includes(prop) && typeof (target[prop]) == typeof (Function)) {

                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        self._negotiationsView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });

        this._negotiationsView = new NegotiationsView($("#negotiationsView"));
        this._negotiationsView.update(this._listNegotiations);

        this._message = new Message();
        this._messageView = new MessageView($("#messageView"));
        this._messageView.update(this._message);
    }

    add(event) {
        event.preventDefault();
        this._listNegotiations.add(this._createNegotiation());

        this._message.text = "Negotiation added successfully";
        this._messageView.update(this._message);
        this._clearForm();
    }

    delete() {
        this._listNegotiations.empty();
        this._message.text = "Negotiations successfully deleted";
        this._messageView.update(this._message);
    }

    _createNegotiation() {
        return new Negotiation(
            DateHelper.textToDate(this._inputDate.value),
            this._inputQuantity.value,
            this._inputValue.value
        );
    }
    _clearForm() {
        this._inputDate.value = "";
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;
        this._inputDate.focus();
    }
} 