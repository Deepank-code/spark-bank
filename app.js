const express = require("express");
var bodyParser = require("body-parser");
const app = express();

const mongoose = require("mongoose");
// const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://admin-deepank:test123@cluster0.lfyc3.mongodb.net/customers",
  {
    useNewUrlParser: true,
  }
);
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  currBalance: Number,
});
const Customer = mongoose.model("Customer", customerSchema);
// const cus1 = {
//   name: "Naveen mishra",
//   email: "naveen@gmail.com",
//   currBalance: 38383,
// };
// const cus2 = {
//   name: "Navneet joshi",
//   email: "johinav@gmail.com",
//   currBalance: 3822383,
// };
// const cus3 = {
//   name: "deepender bhandari",
//   email: "dbhandari@gmail.com",
//   currBalance: 438483,
// };
// const cus4 = {
//   name: "imran ahemad",
//   email: "imran@gmail.com",
//   currBalance: 55556,
// };

app.get("/", function (req, res) {
  // Customer.insertMany([cus1, cus2, cus3], function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("sucessfully saved");
  //   }
  // });
  res.render("home");
});
app.get("/customers", function (req, res) {
  Customer.find(function (err, allcus) {
    if (err) {
      console.log(err);
    } else {
      const allcustomer = allcus.map((cus) => {
        return cus;
      });
      console.log(allcustomer);
      res.render("customers", { ccustomer: allcustomer });
    }
  });
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/send", function (req, res) {
  res.render("send");
});
app.get("/money", function (req, res) {
  res.render("money");
});
app.post("/send", function (req, res) {
  console.log(req.body.sender);
});
app.get("/services", function (req, res) {
  res.render("services");
});
app.get("/:id", (req, res) => {
  console.log(req.params.id);
  Customer.findById(req.params.id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("view", { docs: docs });
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (req, res) {
  console.log("server is running at port 3000");
});
