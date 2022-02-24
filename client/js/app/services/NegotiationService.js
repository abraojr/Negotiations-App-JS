class NegotiationService {

    getNegotiationOfTheWeek(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open("GET", "negotiations/week");

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                cb(null, JSON.parse(xhr.responseText)
                    .map(object => new Negotiation(new Date(object.date), object.quantity, object.value)))
            } else {
                console.log(xhr.responseText);
                cb("Negotiations could not be obtained.");
            }
        }
        xhr.send();
    }
}