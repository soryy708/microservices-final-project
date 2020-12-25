const express = require('express');
const bodyParser = require('body-parser');
const config = require('../../config.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    const isInteger = num => num === (Math.floor(num * 10) / 10);
    if (req.query.a === undefined || req.query.b === undefined ||
        req.query.a === null || req.query.b === null ||
        isNaN(Number(req.query.a)) || isNaN(Number(req.query.b)) ||
        !isInteger(Number(req.query.a) || !isInteger(Number(req.query.b)))) {
        res.status(400).send();
        return;
    }
    const result = Number(req.query.a) % Number(req.query.b);
    res.status(200).send(`${result}`);
});

const listener = app.listen(process.env.NODE_ENV === 'test' ? 0 : config.microservices.mod.port, () =>
    console.log(`Now listening on port ${listener.address().port}`)
);

module.exports = app;
