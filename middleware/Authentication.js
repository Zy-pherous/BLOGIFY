const { validateToken } = require("../services/authentication");
const User = require("../models/user");

function CheckforCookieAuthentication(cookieName) {
  return async (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      console.log("No token found in cookies");
      return next();
    }

    try {
      const userpayload = validateToken(tokenCookieValue);
      req.user = userpayload;
      res.locals.user = userpayload;
    } catch (error) {
      console.error("Error validating token:", error);
    }
    return next();
  };
}

module.exports = CheckforCookieAuthentication;
