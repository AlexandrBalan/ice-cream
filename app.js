// import the express module
import express from "express";

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
