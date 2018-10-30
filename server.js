
const express=require('express');
const app = express();
//const jsonParser=require('body-parser');
const blogRouter=require('./blogRouter');
const morgan=require('morgan');

app.use(morgan('common'));

app.use('/blog-posts',blogRouter);

/*
app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });
*/

let server; //when server runs it assaigns a value

/*
function runServer(){
  const port = process.env.PORT|| 8080;
  return new Promise((resolve, reject)=>{
    server=app.listen(port,()=>{
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on("error",err=>{
      reject(err);
    });
  });
}

function closeServer(){
  return new Promise((resolve,reject)=>{
    console.log("Closing server");
    server.close(err =>{
      if(err){
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports={app,runServer,closeServer};

*/

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };