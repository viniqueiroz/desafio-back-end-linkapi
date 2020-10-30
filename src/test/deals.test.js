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

describe('Deals', () => {
  before((done) => { //Before the tests we empty the database
    Deal.collection.drop({}, (err) => {
      done();
    });
  });

});