const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./serverConfig");

const generateToken = (id,role) => {
  return jwt.sign({ id,role:role ?? "user" },JWT_SECRET , {
    expiresIn: "30d",
  });
};

module.exports = generateToken;