// This is the starting test file, should be on top after compiling
// The idea is to add requires here.
let app = require('../src/app.js'),
    chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('server', () => {
    it('should exist', done => {
        expect(app).to.exist
        done()
    });

    describe('Routes', () => {
        it('should list all users', done => {
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                });
        });
        it('should fetch friends of a user', done => {
            chai.request(app)
                .get('/api/users/1/friends/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.eql(1);
                    done()
                });
        });
    });

    describe('Api', function () {
        it('/users', function () {
            // expect(false).to.equal(true);
        });
    });
});
