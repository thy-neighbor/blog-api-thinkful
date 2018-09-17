//Blog Router 
const express=require('express');
const router= express.Router();

const bodyParser=require('body-parser');
const jsonParser=bodyParser.json();


const morgan=require('morgan');

const {BlogPosts}=require('./models');

BlogPosts.create("Save the Children","Before the money there was love","Joey Badass","9/12/18");
BlogPosts.create("Dollar n a Dream","Hello hello hello","J-cole","9/14/18");
BlogPosts.create("Syre","Done with remincing","Jaden Smith","9/9/18");

router.get('/',(req,res)=>{
    res.json(BlogPosts.get());
});

router.post('/',jsonParser,(req,res)=>{
    const reqItems=['title', 'content', 'author', 'publishDate'];
    const currentItems=req.body;

    for(i=0;i<reqItems.length;i++){
        if(!(reqItems[i] in currentItems)){
            const message = `Missing \`${reqItems[i]}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    
    const newPost=BlogPosts.create(currentItems.title,currentItems.content,currentItems.author,currentItems.publishDate);
    res.status(204).json(newPost);
});

router.delete('/:id',(req,res)=>{
    const deleteThis=req.params.id;
    BlogPosts.delete(deleteThis);
    console.log(`Deleted blog post ${deleteThis}`);
    res.status(204).end();
});

router.put('/:id',jsonParser,(req,res)=>{
    const reqItems=['id','title', 'content', 'author', 'publishDate'];
    const currentItems=req.body;

    for(i=0;i<reqItems.length;i++){
        if(!(reqItems[i] in currentItems)){
            const message = `Missing \`${reqItems[i]}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    
    if(req.params.id !== currentItems.id){
        const message = (
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
          console.error(message);
          return res.status(400).send(message);    
    }
    console.log(`Updating shopping list item \`${req.params.id}\``);
    const newPost={
        id:currentItems.id,
        title:currentItems.title,
        content:currentItems.content,
        author:currentItems.author,
        publishDate:currentItems.publishDate
    };
    BlogPosts.update(newPost);
    res.status(204).end();
});


module.exports=router;