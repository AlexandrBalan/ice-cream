// import the express module
import express from "express";

import mysql2 from 'mysql2';
import dotenv from 'dotenv';



dotenv.config();



const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}).promise();



//create an instance of an express application
const app = express();

//define a port number for our server to listen on
const PORT = 3001;

const orders = [];

//enable static file serving
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//defining a default route ("/")
app.get("/", (req, res) => {
  // res.send('Welcome to My Ice Cream Shop');
  res.render("home");
});

app.get("/db-test", async (req, res) => {
  try {
    const [orders] = await pool.query("SELECT * FROM orders");
    res.send(orders);
  } catch (err) {
    console.error("Database error: ", err);
    res.status(500).send("Dataabse error: " + err.message);
  }

})


app.post("/submit-order", (req, res) => {
  const order = req.body;
  order.timestamp = new Date().toLocaleString();
  orders.push(order);
  console.log(order);

  res.render("confirm", { order });
});

//add a admin route to display a contact view page
app.get("/admin", (req, res) => {
  res.render("admin", { orders });
});

//start the server on the designated port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
