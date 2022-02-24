class NegotiationController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $("#date");
        this._inputQuantity = $("#quantity");
        this._inputValue = $("#value");
        this._listNegotiations = new ListNegotiations();

        this._negotiationsView = new NegotiationsView($("#negotiationsView"));
        this._negotiationsView.update(this._listNegotiations);

        this._message = new Message();
        this._messageView = new MessageView($("#messageView"));
        this._messageView.update(this._message);
    }

    add(event) {
        event.preventDefault();
        this._listNegotiations.add(this._createNegotiation());
        this._negotiationsView.update(this._listNegotiations);

        this._message.text = "Negotiation added successfully";
        this._messageView.update(this._message);
        this._clearForm();
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