const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../database/dbConnect.js');

describe('POST/research-paper/add',()=>{
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

    it('OK, uploading a new research paper is works fine',(done)=>{
        request(app).post('/research-paper/add/:userId')
        .send({title:'title is here'},{description:"Nodejs"},{authorsnames:"N.P.Nihal"},{numberofpages:"10"})
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('title');
            expect(body).to.contain.property('description');
            expect(body).to.contain.property('authorsnames');
            expect(body).to.contain.property('numberofpages');
            done();
        })
        .catch((err)=> done(err));
    });

    it('Fail, uploading a new research paper is not working !',(done)=>{
        request(app).post('/research-paper/add/:userId')
        .send({title:'title is here'},{description:"Nodejs"},{authorsnames:"N.P.Nihal"},{numberofpages:"10"})
        .then((res)=>{
            const body = res.body;
            console.log(body);
            expect(body.errors.title)
                .to.equal('ErrorOccurred')
            done();
        })
        .catch((err)=> done(err));
    });
    
})