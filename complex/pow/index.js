const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('../../config.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async(req, res) => {
    const makeUrl = microservice => `${microservice.protocol}://${microservice.host}:${microservice.port}`
    const mul = (a, b) => {
        const mulUrl = makeUrl(config.microservices.mul);
        const mulBkUrl = makeUrl(config.microservices['mul-bk']);
        const options = { params: { a, b } };
        return axios(mulUrl, options)
            .catch(err => { console.log(err); return axios(mulBkUrl, options); })
            .then(response => response.data);
    };

    try {
        if (req.query.a === undefined || req.query.b === undefined ||
            req.query.a === null || req.query.b === null ||
            isNaN(Number(req.query.a)) || isNaN(Number(req.query.b))) {
            res.status(400).send();
            return;
        }

        let result = 1;
        for (let i = 0; i < Math.abs(Number(req.query.b)); ++i) {
            const response = await mul(result, req.query.a);
            result = Number(response);
            if (isNaN(result)) {
                res.status(500).send();
                return;
            }
        }
        if (Number(req.query.b) < 0 && result !== 0) {
            result = Number(await axios(makeUrl(config.microservices.div), { params: { a: 1, b: result } }).then(response => response.data));
            if (isNaN(result)) {
                res.status(500).send();
                return;
            }
        }

        res.status(200).send(`${result}`);

    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

const listener = app.listen(process.env.NODE_ENV === 'test' ? 0 : config.microservices['pow-bk'].port, () =>
    console.log(`Now listening on port ${listener.address().port}`)
);

module.exports = app;
