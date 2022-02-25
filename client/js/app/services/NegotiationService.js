class NegotiationService {

    constructor() {
        this._http = new HttpService();
    }

    getNegotiationOfTheWeek() {

        return this._http
            .get("negotiations/week")
            .then(negotiations => {
                return negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
            }).catch(error => {
                console.log(error);
                throw new Error("Negotiations of the week could not be obtained.");
            });
    }

    getNegotiationOfThePreviousWeek() {

        return this._http
            .get("negotiations/previous")
            .then(negotiations => {
                return negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
            }).catch(error => {
                console.log(error);
                throw new Error("Negotiations of the previous week could not be obtained.");
            });
    }

    getNegotiationOfTheLastWeek() {

        return this._http
            .get("negotiations/last")
            .then(negotiations => {
                return negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
            }).catch(error => {
                console.log(error);
                throw new Error("Negotiations of the last week could not be obtained.");
            });
    }

    getNegotiations() {
        return Promise.all([this.getNegotiationOfTheWeek(), this.getNegotiationOfThePreviousWeek(), this.getNegotiationOfTheLastWeek()])
            .then(periods => {
                let negotiations = periods
                    .reduce((data, period) => data.concat(period), [])
                    .map(data => new Negotiation(new Date(data.date), data.quantity, data.value));
                return negotiations;
            }).catch(error => {
                throw new Error(error);
            });
    }

    register(negotiation) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegotiationDao(connection))
            .then(dao => dao.add(negotiation))
            .then(() => "Negotiation added successfully.")
            .catch(() => {
                throw new Error("Could not add the negotiation");
            });
    }
}