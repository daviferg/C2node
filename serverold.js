//// No database
const express = require("express");
const app = express();
const port = 8080;

app.get("/", async(req,res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.send("<h1>Hello world I changed but still on port 8080</h1>");
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:',port);
});

///////// Postgres database
// Import the postgres client
const { Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;

// Connect to our postgres database
// These values like `root` and `postgres` will be
// defined in our `docker-compose-yml` file
const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});


// Serves a folder called `public` that we will create
app.use(express.static("public"));

// When a GET request is made to /employees
// Our app will return an array with a list of all
// employees including name and title
// this data is defined in our `database-seed.sql` file
app.get("/employees", async (req, res) => {
  const results = await client
    .query("SELECT * FROM employees")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

// Our app must connect to the database before it starts, so
// we wrap this in an IIFE (Google it) so that we can wait
// asynchronously for the database connection to establish before listening
(async () => {
  await client.connect();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();




////Postgres Test from web
app.get("/employees/:emp_id", async (req,res) => {
    const query = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT * FROM employees WHERE emp_id = $1'    
    }
   
    query.values = [req.params.emp_id];
   
    // callback
    await pool.query(query, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.json(response.rows);
      }
    });
   });
   