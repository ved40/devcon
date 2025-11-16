const express = require("express");
const app = express();
const path = require("path");
const todo = require("./models/todo.js");
const event = require("./models/event.js");
const admin = require("./models/admin.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/todo", async (req, res) => {
    let tasks = await todo.find();
    res.render("todo.ejs", { tasks });

})

app.post("/todo", async (req, res) => {
    const newTask = new todo(req.body);
    await newTask.save();
    let tasks = await todo.find();
    res.render("todo.ejs", { tasks });
})

app.delete("/todo", async (req, res) => {
    await todo.deleteOne();
    res.redirect("/todo");
})

app.get("/events", (req, res) => {
    res.render("events.ejs")
})

app.get("/sign_in", (req, res) => {
    res.render("sign_in.ejs");
})

app.post("/sign_in", async (req, res) => {
    let adminData = await admin.find();

    let admin1 = adminData[0];
    let formData = req.body;
    if (
        (formData.email === admin1.email && formData.password === admin1.password)
    ) {
        res.render("admin.ejs")
    }
})

// let adminData = {
//     email: 'campuscompanion@mail.com',
//     password: 'campus@2025'
// }

// let admin1 = new admin(adminData);
// admin1.save()
//     .then(() => {
//         console.log("saved successfully")
//     })



app.listen(8080, () => {
    console.log("app is listening on the port 8080")
})