class NegotiationService {

    constructor() {
        this._http = new HttpService();
    }

    getNegotiationOfTheWeek() {

        return new Promise((resolve, reject) => {

            this._http
                .get("negotiations/week")
                .then(negotiations => {
                    resolve(negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));
                }).catch(error => {
                    console.log(error);
                    reject("Negotiations of the week could not be obtained.");
                });
        });
    }

    getNegotiationOfThePreviousWeek() {

        return new Promise((resolve, reject) => {

            this._http
                .get("negotiations/previous")
                .then(negotiations => {
                    resolve(negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));
                }).catch(error => {
                    console.log(error);
                    reject("Negotiations of the previous week could not be obtained.");
                });
        });
    }

    getNegotiationOfTheLastWeek() {

        return new Promise((resolve, reject) => {

            this._http
                .get("negotiations/last")
                .then(negotiations => {
                    resolve(negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));
                }).catch(error => {
                    console.log(error);
                    reject("Negotiations of the last week could not be obtained.");
                });
        });
    }

    getNegotiations() {
        return Promise.all([this.getNegotiationOfTheWeek(), this.getNegotiationOfThePreviousWeek(), this.getNegotiationOfTheLastWeek()])
            .then(periods => {
                let negotiations = periods.reduce((data, period) => data.concat(period), []);
                return negotiations;
            }).catch(error => {
                throw new Error(error);
            });
    }
}