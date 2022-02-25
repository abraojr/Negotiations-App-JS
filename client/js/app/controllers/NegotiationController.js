class NegotiationController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $("#date");
        this._inputQuantity = $("#quantity");
        this._inputValue = $("#value");

        this._listNegotiations = new Bind(new ListNegotiations(), new NegotiationsView($("#negotiationsView")), "add", "empty", "sortBy", "invertSortBy");
        this._message = new Bind(new Message(), new MessageView($("#messageView")), "text");
        this._currentOrder = "";
        this._service = new NegotiationService();
        this._init();
    }

    _init() {

        this._service
            .list()
            .then(negotiations =>
                negotiations.forEach(negotiation =>
                    this._listNegotiations.add(negotiation)))
            .catch(error => this._message.text = error);

        setInterval(() => {
            this.importNegotiations();
        }, 3000)
    }

    add(event) {
        event.preventDefault();

        let negotiation = this._createNegotiation();

        this._service
            .register(negotiation)
            .then(message => {
                this._listNegotiations.add(negotiation);
                this.message.text = message;
                this._clearForm();
            })
            .catch(error => this._message.text = error);
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

        this._service
            .getNegotiations()
            .then(negotiations =>
                negotiations.filter(negotiation =>
                    !this._listNegotiations.negotiations.some(existingNegotiation =>
                        JSON.stringify(negotiation) == JSON.stringify(existingNegotiation))))
            .then(negotiations => {
                negotiations.forEach(negotiation => this._listNegotiations.add(negotiation));
                this._message.text = "Successfully imported negotiations of the period.";
            }).catch(error => this._message.text = error);
    }

    delete() {

        this._service
            .delete()
            .then(text => {
                this._message.text = text;
                this._listNegotiations.empty();
            })
            .catch(error => this.message.text = error);
    }

    _createNegotiation() {
        return new Negotiation(
            DateHelper.textToDate(this._inputDate.value),
            parseInt(this._inputQuantity.value),
            parseFloat(this._inputValue.value)
        );
    }
    _clearForm() {
        this._inputDate.value = "";
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;
        this._inputDate.focus();
    }
} 