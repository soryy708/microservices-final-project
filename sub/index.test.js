const assert = require('assert');
const request = require('supertest');
const app = require('.');

it('1-0=1', done => {
    request(app)
        .get('/?a=1&b=0')
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

it('1-1=0', done => {
    request(app)
        .get('/?a=1&b=1')
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

it('1-2=-1', done => {
    request(app)
        .get('/?a=1&b=2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '-1');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('1--2=3', done => {
    request(app)
        .get('/?a=1&b=-2')
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

it('2-1=1', done => {
    request(app)
        .get('/?a=2&b=1')
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
