//During the test the env variable is set to test
let mongoose = require("mongoose");
const Deal = require("../app/models/deal");
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
const chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('..');
let should = chai.should();


chai.use(chaiHttp);

describe('Deals', (done) => {

  before((done) => { //Before the tests we empty the database
    Deal.collection.drop({}, (err) => {
    });
    Deal.collection.insertOne({
      name: 'Deal de Teste',
      description: 'Descrição do Deal de Teste',
      value: 550,
      date: '2020-10-30T01:05:34.000+00:00',
      pipedrive_id: 5,
      bling_id: 6
    }).then((deal) => {
      done();
    });
  });

  /*
      * Test the /GET route
      */
  describe('/GET deals', () => {
    it('it should GET all the deals', (done) => {
      chai.request(server)
        .get('/deals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/GET single deal', () => {
    it('it should GET the first deal', (done) => {
      chai.request(server)
        .get('/deals')
        .end(function (err, res) {
          const id = res.body[0]._id
          chai.request(server)
            .get('/deals/' + id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body._id.should.equal(id);
              done();
            });
        });
    });
  });

  describe('/GET deals reports', () => {
    it('it should GET all the deals grouped by date', (done) => {
      chai.request(server)
        .get('/deals/reports')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});
