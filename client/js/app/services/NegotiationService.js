class NegotiationService {

    getNegotiationOfTheWeek() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open("GET", "negotiations/week");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));
                    } else {
                        console.log(xhr.responseText);
                        reject("Negotiations of the week could not be obtained.");
                    }
                }
            }
            xhr.send();
        });
    }

    getNegotiationOfThePreviousWeek() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open("GET", "negotiations/previous");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));
                    } else {
                        console.log(xhr.responseText);
                        reject("Negotiations of the week could not be obtained.");
                    }
                }
            }
            xhr.send();
        });
    }

    getNegotiationOfTheLastWeek() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open("GET", "negotiations/last");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));
                    } else {
                        console.log(xhr.responseText);
                        reject("Negotiations of the week could not be obtained.");
                    }
                }
            }
            xhr.send();
        });
    }
}