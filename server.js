if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const expressEjsLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use("/", indexRouter);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("coonnected to Mongoose"));
app.listen(process.env.PORT || 3000);
