const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// this is connectDb method we defined to connect with the db
connectDb();
const app = express();
const port = process.env.PORT || 5000;

// this is parser provided in express, to parse the data from the client
app.use(express.json());
// this is error handler we created
app.use(errorHandler);


// app.get() - manages the routes, but make a dir and manage  routes separately
// then use app.use() to get the routes from that file
// app.use() is used mostly as a middleware method

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, ()=> {
    console.log(`Server runs on port ${port}`);
});