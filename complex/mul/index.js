const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async(req, res) => {
    try {
        if (req.query.a === undefined || req.query.b === undefined ||
            req.query.a === null || req.query.b === null ||
            isNaN(Number(req.query.a)) || isNaN(Number(req.query.b))) {
            res.status(400).send();
            return;
        }

        let result = 0;
        for (let i = 0; i < Math.abs(Number(req.query.b)); ++i) {
            const response = await axios(`${config.microservices.add.protocol}://${config.microservices.add.host}:${config.microservices.add.port}`, {
                params: { a: result, b: req.query.a },
            });
            result = Number(response.data);
            if (isNaN(result)) {
                res.status(500).send();
                return;
            }
        }
        if (Number(req.query.b) < 0) {
            result *= -1;
        }

        res.status(200).send(`${result}`);

    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

const listener = app.listen(process.env.NODE_ENV === 'test' ? 0 : config.microservices['mul-bk'].port, () =>
    console.log(`Now listening on port ${listener.address().port}`)
);

module.exports = app;
