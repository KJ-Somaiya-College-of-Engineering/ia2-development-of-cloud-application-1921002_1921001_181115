let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')

chai.should()

chai.use(chaiHttp)

describe('Items API', () => {

    //Test the GET route
    describe('GET api/items', () => {
        it("It should get all items", (done) => {
            chai.request(server)
            .get("/api/items")
            .end((err, response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                done();
            })
        })
    })
    describe('GET api/items', () => {
        it("It should NOT get all items", (done) => {
            chai.request(server)
            .get("/api/item")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
        })
    })
    
})