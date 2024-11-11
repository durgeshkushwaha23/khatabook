require("dotenv").config();
const express = require("express")
const app = express();
const path = require("path");
const cookieParse = require("cookie-parser")

const indexRounter = require("./routes/index-router")
const hisaabRounter = require("./routes/hisaab-router")

const db = require('./config/mongoose-connection')

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParse());


app.use("/",indexRounter);
app.use("/hisaab",hisaabRounter);


app.listen(3000)
