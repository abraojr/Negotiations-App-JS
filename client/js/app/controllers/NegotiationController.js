class NegotiationController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $("#date");
        this._inputQuantity = $("#quantity");
        this._inputValue = $("#value");

        this._negotiationsView = new NegotiationsView($("#negotiationsView"));

        this._listNegotiations = new Bind(new ListNegotiations(), this._negotiationsView, ["add", "empty"]);

        this._messageView = new MessageView($("#messageView"));

        this._message = new Bind(new Message(), this._messageView, ["text"]);
    }

    add(event) {
        event.preventDefault();
        this._listNegotiations.add(this._createNegotiation());
        this._message.text = "Negotiation added successfully";
        this._clearForm();
    }

    delete() {
        this._listNegotiations.empty();
        this._message.text = "Negotiations successfully deleted";
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