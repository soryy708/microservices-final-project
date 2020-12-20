const axios = require('axios');
const config = require('../config.json');

function add(a, b) {
    return axios(`${config.microservices.add.host}:${config.microservices.add.port}`, {
        params: { a, b },
    })
        .then(res => res.data);
}

function div(a, b) {
    return axios(`${config.microservices.div.host}:${config.microservices.div.port}`, {
        params: { a, b },
    })
        .then(res => res.data);
}

function factorial(a, b) {
    return axios(`${config.microservices.factorial.host}:${config.microservices.factorial.port}`, {
        params: { a, b },
    })
        .then(res => res.data);
}

function mod(a, b) {
    return axios(`${config.microservices.mod.host}:${config.microservices.mod.port}`, {
        params: { a, b },
    })
        .then(res => res.data);
}

function mul(a, b) {
    return axios(`${config.microservices.mul.host}:${config.microservices.mul.port}`, {
        params: { a, b },
    })
        .then(res => res.data)
        .catch(() => {
            let result = 0;
            for (let i = 0; i < Math.abs(Number(b)); ++i) {
                result = await add(result, a);
            }
            if (Number(b) < 0) {
                result *= -1;
            }
            return result;
        });
}

function percent(a, b) {
    return axios(`${config.microservices.percent.host}:${config.microservices.percent.port}`, {
        params: { a, b },
    })
        .then(res => res.data);
}

function pow(a, b) {
    return axios(`${config.microservices.pow.host}:${config.microservices.pow.port}`, {
        params: { a, b },
    })
        .then(res => res.data)
        .catch(() => {
            let result = 0;
            for (let i = 0; i < Math.abs(Number(b)); ++i) {
                result = await mul(result, a);
            }
            if (Number(b) < 0) {
                result = await div(1, result);
            }
            return result;
        });
}

function sub(a, b) {
    return axios(`${config.microservices.sub.host}:${config.microservices.sub.port}`, {
        params: { a, b },
    })
        .then(res => res.data);
}

module.exports = {
    add,
    div,
    factorial,
    mod,
    mul,
    percent,
    pow,
    sub,
};
