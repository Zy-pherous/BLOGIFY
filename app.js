require("dotenv").config();
const express = require("express");
const path = require("path");
const Blog = require("./models/Blog");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const CheckforCookieAuthentication = require("./middleware/Authentication");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then((e) => console.log("mongoDB connect"));

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(CheckforCookieAuthentication("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.listen(PORT, () => console.log("Server is running"));
