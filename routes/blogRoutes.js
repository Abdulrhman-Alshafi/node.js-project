const express = require("express");
const blogController = require("../controller/blogController");

const Blog = require("../models/blog");
const router = express.Router();

//index
router.get("/", blogController.blog_index);

//all posts
router.post("/", blogController.blog_create_post);

//form
router.get("/create", blogController.blog_create_get);

//get post by id
router.get("/:id", blogController.blog_details);

//delete post by id
router.delete("/:id", blogController.blog_delete);

module.exports = router;
