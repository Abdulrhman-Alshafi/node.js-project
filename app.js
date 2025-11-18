const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { result } = require("lodash");
const app = express();

// MongoDB connection URI (never expose passwords in real apps!)
const dbURI =
  "mongodb+srv://abdulrhman-alshafee:waleed68@cluster0.o5jfus9.mongodb.net/node-tuts?retryWrites=true&w=majority";
// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    // Start server only after successful DB connection
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Important for parsing form data later

// Set view engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blog", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page - must be last
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
