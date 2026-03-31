const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // 🔥 separar Bearer del token
    const token = authHeader.split(" ")[1];

    // 🔥 usar la misma clave que en el login (.env)
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token inválido" });
  }
};