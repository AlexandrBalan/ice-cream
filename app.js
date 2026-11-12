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


//enable static file serving
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//defining a default route ("/")
app.get("/", (req, res) => {
  // res.send('Welcome to My Ice Cream Shop');
  res.render("home");
});

// app.get("/db-test", async (req, res) => {
//   try {
//     const [orders] = await pool.query("SELECT * FROM orders");
//     res.send(orders);
//   } catch (err) {
//     console.error("Database error: ", err);
//     res.status(500).send("Database error: " + err.message);
//   }
// });

app.post("/submit-order", async (req, res) => {
  try {
    const order = req.body;
    console.log("New order submitted:", order);

    order.topping = Array.isArray(order.topping)
    ? order.topping.join(", ")
    : order.topping || "";

    const sql = `INSERT INTO orders (customer, email, flavor, cone, toppings, comment) VALUES (?, ?, ?, ?, ?, ?);`;

    const params = [
    order.fname + " " + order.lname,
    order.email,
    order.flavor,
    order.conetype,
    order.topping,
    order.comments
    ];

    const [result] = await pool.execute(sql, params);

    order.id = result.insertId;
    console.log("Order saved with ID:", order.id);

    res.render("confirm", { order });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).send("Sorry, there was an error processing your order. Please try again.");
  }
});

//add a admin route to display a contact view page
app.get("/admin", async (req, res) => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM orders ORDER BY timestamp DESC"
    );
    res.render("admin", { orders });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Error loading orders: " + err.message);
  }
});

//start the server on the designated port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});