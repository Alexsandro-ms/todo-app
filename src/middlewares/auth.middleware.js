const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secretKey = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const tokenWithoutBearer = token.replace("Bearer ", "");

    jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "User not authorized" });
  }
};

module.exports = authMiddleware;
