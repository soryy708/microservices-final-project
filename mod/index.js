const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    const isInteger = num => num === 10 * Math.floor(num / 10);
    if (req.query.a === undefined || req.query.b === undefined ||
        req.query.a === null || req.query.b === null ||
        isNaN(Number(req.query.a)) || isNaN(Number(req.query.b)) ||
        !isInteger(Number(req.query.a) || !isInteger(Number(req.query.b)))) {
        res.status(400).send();
        return;
    }
    res.status(200).send(Number(req.query.a) % Number(req.query.b));
});
