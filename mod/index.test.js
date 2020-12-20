const assert = require('assert');
const request = require('supertest');
const app = require('.');

it('2%2=0', done => {
    request(app)
        .get('/?a=2&b=2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '0');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('1%2=1', done => {
    request(app)
        .get('/?a=1&b=2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '1');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('3%2=1', done => {
    request(app)
        .get('/?a=3&b=2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '1');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('3%4=3', done => {
    request(app)
        .get('/?a=3&b=4')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '3');
            } catch(err) {
                done(err);
            }
            done();
        });
});
