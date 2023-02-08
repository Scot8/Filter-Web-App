const mysql = require("./config.js");



function allCuisines(criteria)
{

    query = `select * from restaurants where cuisine = ? LIMIT ?, ?`; 
    let safeQuery = mysql.functions.format(query, [criteria.secondFilter, criteria.skip, criteria.take]);
    return querySql(safeQuery);

}

function numCuisines(criteria)
{ 
    query1 = `SELECT * FROM restaurants where cuisine = ?`; 
    let safeQuery = mysql.functions.format(query1, [criteria.secondFilter]);
    return querySql(safeQuery);
}

function allRestaraunts(criteria)
{
    query = `SELECT * FROM restaurants ORDER BY name LIMIT ?,?`;
    let safeQuery = mysql.functions.format(query, [criteria.skip, criteria.take]);
    return querySql(safeQuery);
}
function numRestaraunts()
{
    query = `SELECT * FROM restaurants`;
    let safeQuery = mysql.functions.format(query);
    return querySql(query);
}


function allCountries(criteria)
{
    query = `SELECT * FROM restaurants  where country = ? ORDER BY country LIMIT ?,?`;
    let safeQuery = mysql.functions.format(query, [criteria.secondFilter, criteria.skip, criteria.take]);
    return querySql(safeQuery);
}
function numCountries(criteria)
{ 
    query = `SELECT * FROM restaurants where country = ?`; 
    let safeQuery = mysql.functions.format(query, [criteria.secondFilter]);
    return querySql(safeQuery);
}


function allCities(criteria)
{

    query = `select * from restaurants where city = ? LIMIT ?, ?`; 
    let safeQuery = mysql.functions.format(query, [criteria.secondFilter, criteria.skip, criteria.take]);
    return querySql(safeQuery);

}

function numCities(criteria)
{ 
    query1 = `SELECT * FROM restaurants where city = ?`; 
    let safeQuery = mysql.functions.format(query1, [criteria.secondFilter]);
    return querySql(safeQuery);
}

function countries()
{
    let query = "SELECT DISTINCT country FROM restaurants ORDER by country";
    let safeQuery = mysql.functions.format(query);
    return querySql(query);
}
function cities()
{
    let query = "SELECT DISTINCT city FROM restaurants ORDER by city";
    let safeQuery = mysql.functions.format(query);
    return querySql(query);
}
function cuisines()
{
    let query = "SELECT DISTINCT cuisine FROM restaurants ORDER by cuisine";
    let safeQuery = mysql.functions.format(query);
    return querySql(query);
}
module.exports = {
    "allCuisines" : allCuisines,
    "numCuisines" : numCuisines,
    "allRestaraunts": allRestaraunts,
    "numRestaraunts": numRestaraunts,
    "allCountries": allCountries,
    "numCountries": numCountries,
    "allCities": allCities,
    "numCities": numCities,
    "cities": cities,
    "cuisines": cuisines,
    "countries": countries
};


/*****************************************************************
 *        You can ignore everything below here!
 *****************************************************************/

// don't worry too much about this function! 
// it has been written to return the data from your database query
// *** it DOES NOT need modifying! ***
function querySql(sql) {
    let con = mysql.getCon();

    con.connect(function(error) {
        if (error) {
          return console.error(error);
        } 
      });

    return new Promise((resolve, reject) => {
        con.query(sql, (error, sqlResult) => {
            if(error) {
                return reject(error);
            }           

            return resolve(sqlResult);
        });

        con.end();
    });
}