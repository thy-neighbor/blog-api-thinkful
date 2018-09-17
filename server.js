
const express=require('express');
const app = express();
//const jsonParser=require('body-parser');
const blogRouter=require('./blogRouter');
const morgan=require('morgan');

app.use(morgan('common'));

app.use('/blog-posts',blogRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });
  