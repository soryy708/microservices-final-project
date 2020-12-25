const assert = require('assert');
const request = require('supertest');
const app = require('.');

it('2/1=2', done => {
    request(app)
        .get('/?a=2&b=1')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '2');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('4/2=2', done => {
    request(app)
        .get('/?a=4&b=2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '2');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('5/2=2.5', done => {
    request(app)
        .get('/?a=5&b=2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '2.5');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('5/-2=-2.5', done => {
    request(app)
        .get('/?a=5&b=-2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '-2.5');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('1/0=NaN', done => {
    request(app)
        .get('/?a=1&b=0')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, 'NaN');
            } catch(err) {
                done(err);
            }
            done();
        });
});
