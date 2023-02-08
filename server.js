const express = require('express');
const app = express();
const queries = require("./mysql/queries");
const mysql = require('mysql');
const config = require('./mysql/config');
const { getCon } = require('./mysql/config');    
//ROHAN SCOTT


app.use(express.static("public"));  //public library for css and js
app.set('view engine', 'ejs');
app.listen(3000);

app.get("/", (request, response) => {


    response.render("index");

  
});

app.get("/restaurants", (request, response) => {  // default page will load here!

  let con = getCon();
  con.connect();

  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;

let query1 = queries.allRestaraunts( {skip, take});
let query2 = queries.numRestaraunts();
Promise.all([query1, query2]).then(result => {
  response.json(result);
 });

});

app.get("/country", (request, response) => {   // these three routes country, city, cusine              
  queries.countries().then(result => {         // are for dropdown!!    
    response.json(result);
  })

});

app.get("/city", (request, response) => {
  queries.cities().then(result => {                                           
    response.json(result);
  })
});


app.get("/cuisine", (request, response) => {
  queries.cuisines().then(result => {          
    response.json(result);
  })
});




app.get("/cuisine/cuisine", (request, response) => {                               //these three routes are for displaying table.

  let secondFilter = request.query.secondFilter;                                   //functions thats starts with num (eg. numCuisines,  numCountries, numCities)
  let take = parseInt(request.query.take);                                         // are just to get the rows. There were two methods to this count and Data.length(we used this)
    let skip = parseInt(request.query.page) * take;

  let query1 = queries.allCuisines({secondFilter, skip, take});
  let query2 = queries.numCuisines({secondFilter});                  

 Promise.all([query1, query2]).then(result => {
  response.json(result);
 });
});


app.get("/cuisine/country", (request, response) => {
  let secondFilter = request.query.secondFilter;
  let take = parseInt(request.query.take);                                                        
  let skip = parseInt(request.query.page) * take;


  let query1 = queries.allCountries({secondFilter, skip, take});
  let query2 = queries.numCountries({secondFilter});

 Promise.all([query1, query2]).then(result => {
  response.json(result);
 });
});


app.get("/cuisine/city", (request, response) => {

  let secondFilter = request.query.secondFilter;
  let take = parseInt(request.query.take);
    let skip = parseInt(request.query.page) * take;

  let query1 = queries.allCities({secondFilter, skip, take});
  let query2 = queries.numCities({secondFilter});

 Promise.all([query1, query2]).then(result => {
  response.json(result);
 });
});






