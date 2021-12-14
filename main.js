const express = require("express");
const cors = require("cors");
var logger = require('morgan')
const fs = require("fs");
const app = express();
var glob = require("glob")

var corsOptions = {
  origin: "http://localhost:8081"
};
const fileUpload = require('express-fileupload');

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
      "user": "black",
      "pass": "asrkpvg7",
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
});

app.use(fileUpload());
app.use(logger('dev'));
app.use(cors(corsOptions));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs')
app.use(express.static('public'))


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./route/tool.route")(app);
require("./route/customer")(app);
app.use("/baogia", require("./route/baogia"));
app.use("/product", require("./route/product"));
require("./app/routes/product.route")(app);

app.get('*', function(req, res){
  res.render("customer/index", {
    title: "Bảng giá phụ kiện"
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}.`);
});