const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
];

function login(username, password) {
  const user = users.find((u) => u.username === username);

  if (!user) return null;

  const valid = bcrypt.compareSync(password, user.password);

  if (!valid) return null;

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

module.exports = { login };