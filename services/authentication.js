const jwt = require("jsonwebtoken");

const secret = "BatMan@123";

function creteTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    profileImageURL: user.profileImageURL,
    fullName: user.fullName,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  validateToken,
  creteTokenForUser,
};
