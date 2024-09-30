const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mysql = require('mysql2');
const userRouter = require("./router/userRouter");
const bodyParser = require("body-parser");
dotenv.config();
const port = process.env.PORT;
//FOR mysql connection


const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'library_management'
});
// This is not required.. for connection
// connection.connect((err) => {
//   if (err) {
//     console.log("connection error", err)
//   }else{
//     console.log('Connected!');
//   }

// });

app.use(bodyParser.json()) // this is very imp line - for body json format
app.use('/user', userRouter);
//for app start

app.listen(port, () => {
    console.log("Server Started...", port)
})