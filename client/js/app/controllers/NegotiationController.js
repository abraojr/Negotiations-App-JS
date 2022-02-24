class NegotiationController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $("#date");
        this._inputQuantity = $("#quantity");
        this._inputValue = $("#value");

        this._listNegotiations = new Bind(new ListNegotiations(), new NegotiationsView($("#negotiationsView")), "add", "empty", "sortBy", "invertSortBy");
        this._message = new Bind(new Message(), new MessageView($("#messageView")), "text");
        this._currentOrder = "";
    }

    add(event) {
        event.preventDefault();
        this._listNegotiations.add(this._createNegotiation());
        this._message.text = "Negotiation added successfully.";
        this._clearForm();
    }

    sortBy(column) {
        if (this._currentOrder == column) {
            this._listNegotiations.invertSortBy();
        } else {
            this._listNegotiations.sortBy((a, b) => a[column] - b[column]);
        }
        this._currentOrder = column;
    }

    importNegotiations() {
        let service = new NegotiationService();

        service.getNegotiations()
            .then(negotiations => {
                negotiations.forEach(negotiation => this._listNegotiations.add(negotiation));
                this._message.text = "Successfully imported negotiations of the period.";
            }).catch(error => this._message.text = error);
    }

    delete() {
        this._listNegotiations.empty();
        this._message.text = "Negotiations successfully deleted.";
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