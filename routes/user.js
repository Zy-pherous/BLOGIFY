const { Router } = require("express");
const User = require("../models/user");
const {
  creteTokenForUser,
  validateToken,
} = require("../services/authentication");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.validatePassword(password)) {
    const token = creteTokenForUser(user);

    return res.cookie("token", token).redirect("/");
  } else {
    return res.status(401).send("Invalid email or password").redirect("login");
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = router;
