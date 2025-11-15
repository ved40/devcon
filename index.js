const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/devcon");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/todo", (req, res) => {
    res.render("todo.ejs")
})

app.listen(8080, () => {
    console.log("app is listening on the port 8080")
})