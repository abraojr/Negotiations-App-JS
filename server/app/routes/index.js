var api = require('../api');

module.exports = function (app) {

    app.route('/negotiations/week')
        .get(api.listWeek);

    app.route('/negotiations/previous')
        .get(api.listPrevious);

    app.route('/negotiations/last')
        .get(api.listLast);

    app.route('/negotiations')
        .post(api.registerNegotiation);
};