const Events = require('./Events.js');

exports.events = (req, res) => res.json(Events);
exports.event = (req, res) => res.json(Events[req.param.eventId]);