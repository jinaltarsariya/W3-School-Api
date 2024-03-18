const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userVarifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      throw new Error("plz attach token !");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    userId = decoded.id;
    next();
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

module.exports = { userVarifyToken };
