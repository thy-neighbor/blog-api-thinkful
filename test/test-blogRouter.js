
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const {app,runServer,closeServer}=require("../server.js");

chai.use(chaiHttp);



describe("Blog Post Tests",function(){
    before(function(){
        return runServer();
    });
    after(function(){
        return closeServer();
    });
    //GET request
    it("should list items on get",function(){
        return chai
        .request(app)
        .get("/blog-posts")
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.be.above(0);

            const expectedKeys=["id","title", "content", "author", "publishDate"];
            res.body.forEach(function(item){
                expect(item).to.be.a("object");
                expect(item).to.include.keys(expectedKeys);
            });//forEach
        });//then
    });//it
    
    //Post requests
    it("should add an item on Post",function(){
        const newItem={title:"Ordinary People",content:"We don't know which way to go",author:"John Legend",publishDate:"10/28/18"};
        return chai
        .request(app)
        .post("/blog-posts")
        .send(newItem)
        .then(function(res){
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("id","title", "content", "author", "publishDate");
            expect(res.body.id).to.not.equal(null);
            expect(res.body).to.deep.equal(
                Object.assign(newItem,{id:res.body.id})
                );//deep equal
        });//then
    });//it

    it("should update items on put",function(){
        const updateData = {
            title:"Sunshine",
            content:"ON a cloudy day",
            author: "foo",
            publishDate:"10/28/18"
        };

        return (chai
            .request(app)
            .get("/blog-posts")
            .then(function(res){
                updatePost=Object.assign(res.body[0],{
                    title:updateData.title,
                    content:updateData.content
                });//update data

                return chai
                .request(app)
                .put(`/blog-posts/${res.body[0].id}`)
                .send(updatePost)
                .then(function(res){
                    expect(res).to.have.status(204);
                })//then    
            })//then
        );//return
    });//it

    it("Should delete items on delete",function(){
        return(chai
            .request(app)
            .get("/blog-posts")
            .then(function(res){
                return chai
                .request(app)
                .delete(`/blog-posts/${res.body[0].id}`)
                .then(function(res){
                    expect(res).to.have.status(204);
                });//then    
            })//then
        );//return
    });//it
});//Describe