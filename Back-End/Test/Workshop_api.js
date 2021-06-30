const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../database/dbConnect.js');

describe('POST/workshop-proposal/add',()=>{
    before((done)=>{
        conn.connect()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    after((done)=>{
        conn.connect()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    it('OK, adding a new workshop is works fine',(done)=>{
        request(app).post('/workshop-proposal/add/:userId')
        .send({name:'name is here'},{description:"description is here"},{hours:"1"},{minutes:"10"},{conductorsnames:"name here"},{resources:"yes"})
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('description');
            expect(body).to.contain.property('hours');
            expect(body).to.contain.property('minutes');
            expect(body).to.contain.property('conductorsnames');
            expect(body).to.contain.property('resources');

            done();
        })
        .catch((err)=> done(err));
    });

    it('Fail, adding a new workshop is not working !',(done)=>{
        request(app).post('/workshop-proposal/add/:userId')
        .send({name:'name is here'},{description:"description is here"},{hours:"1"},{minutes:"10"},{conductorsnames:"name here"},{resources:"yes"})
        .then((res)=>{
            const body = res.body;
            console.log(body);
            expect(body.errors.name)
                .to.equal('ErrorOccurred')
            done();
        })
        .catch((err)=> done(err));
    });
    
})