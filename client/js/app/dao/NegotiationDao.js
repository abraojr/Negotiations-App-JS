class NegotiationDao {
    constructor(connection) {
        this._connection = connection;
        this._store = "negotiations";
    }

    add(negotiation) {

        return new Promise((resolve, reject) => {

            let request = this._connection.transaction([this._store], "readwrite").objectStore(this._store).add(negotiation);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject("Could not add the negotiation.");
            };
        });
    }

    listAll() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection.transaction([this._store], "readwrite").objectStore(this._store).openCursor();

            let negotiations = [];

            cursor.onsuccess = e => {
                let current = e.target.result;

                if (current) {
                    let data = current.value;

                    negotiations.push(new Negotiation(data._date, data._quantity, data._value));
                    current.continue();
                } else {
                    resolve(negotiations);
                }

            }

            cursor.onerror = e => {
                console.log(e.target.error.name);
                reject("Negotiations could not be listed.");
            }
        });
    }

    deleteAll() {

        return new Promise((resolve, reject) => {

            let request = this._connection.transaction([this._store], "readwrite").objectStore(this._store).clear();

            request.onsuccess = e => resolve("Negotiations successfully removed.");

            request.onerror = e => {
                console.log(e.target.error);
                reject("Could not remove negotiations.");
            }
        });

    }
}