const assert = require('assert');
const request = require('supertest');
const app = require('.');

it('1*0=0', done => {
    request(app)
        .get('/?a=1&b=0')
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

it('2*2=4', done => {
    request(app)
        .get('/?a=2&b=2')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '4');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('2*8=16', done => {
    request(app)
        .get('/?a=2&b=8')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '16');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('1*8=8', done => {
    request(app)
        .get('/?a=1&b=8')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '8');
            } catch(err) {
                done(err);
            }
            done();
        });
});

it('-1*8=-8', done => {
    request(app)
        .get('/?a=-1&b=8')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            try {
                assert.strictEqual(res.text, '-8');
            } catch(err) {
                done(err);
            }
            done();
        });
});
