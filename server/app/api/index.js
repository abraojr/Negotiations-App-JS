var api = {}

var currentDate = new Date();
var previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 7);
var lastDate = new Date();
lastDate.setDate(currentDate.getDate() - 14);

var negotiations = [
    { date: currentDate, quantity: 1, value: 150 },
    { date: currentDate, quantity: 2, value: 250 },
    { date: currentDate, quantity: 3, value: 350 },
    { date: previousDate, quantity: 1, value: 450 },
    { date: previousDate, quantity: 2, value: 550 },
    { date: previousDate, quantity: 3, value: 650 },
    { date: lastDate, quantity: 1, value: 750 },
    { date: lastDate, quantity: 2, value: 950 },
    { date: lastDate, quantity: 3, value: 950 }
];


api.listWeek = function (req, res) {
    var currentNegotiations = negotiations.filter(function (negotiation) {
        return negotiation.date > previousDate;
    });
    res.json(currentNegotiations);
};

api.listPrevious = function (req, res) {

    var previousNegotiaitons = negotiations.filter(function (negotiation) {
        return negotiation.date < currentDate && negotiation.date > lastDate;
    });
    setTimeout(function () {
        res.json(previousNegotiaitons);
    }, 500);

};

api.listLast = function (req, res) {

    var lastNegotiations = negotiations.filter(function (negotiation) {
        return negotiation.date < previousDate;
    });
    res.json(lastNegotiations);

};

api.registerNegotiation = function (req, res) {

    console.log(req.body);
    req.body.date = new Date(req.body.date.replace(/-/g, '/'));
    negotiations.push(req.body);
    res.status(200).json("Negotiation received");
};



module.exports = api;