class NegotiationController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $("#date");
        this._inputQuantity = $("#quantity");
        this._inputValue = $("#value");

        this._listNegotiations = new Bind(new ListNegotiations(), new NegotiationsView($("#negotiationsView")), "add", "empty", "sortBy", "invertSortBy");
        this._message = new Bind(new Message(), new MessageView($("#messageView")), "text");
        this._currentOrder = "";

        ConnectionFactory
            .getConnection()
            .then(connection => new NegotiationDao(connection))
            .then(dao => dao.listAll())
            .then(negotiations => negotiations.forEach(negotiation => this._listNegotiations.add(negotiation)))
            .catch(error => {
                console.log(error);
                this._message.text = error;
            });
    }

    add(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let negotiation = this._createNegotiation();

                new NegotiationDao(connection)
                    .add(negotiation)
                    .then(() => {
                        this._listNegotiations.add(negotiation);
                        this._message.text = "Negotiation added successfully.";
                        this._clearForm();
                    });
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
        let service = new NegotiationService();

        service.getNegotiations()
            .then(negotiations => {
                negotiations.forEach(negotiation => this._listNegotiations.add(negotiation));
                this._message.text = "Successfully imported negotiations of the period.";
            }).catch(error => this._message.text = error);
    }

    delete() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegotiationDao(connection))
            .then(dao => dao.deleteAll())
            .then(message => {
                this._message.text = message;
                this._listNegotiations.empty();
            });
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