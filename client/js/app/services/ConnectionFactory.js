var ConnectionFactory = (function () {

    const stores = ["negotiations"];
    const version = 2;
    const dbName = "negotiationapp";

    var connection = null;
    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error("Cannot create ConnectionFactory instances.");
        }

        static getConnection() {
            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error("You cannot directly close the connection.")
                        }
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);

                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }
})();