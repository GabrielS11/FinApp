import jwt from "jsonwebtoken";

function authMiddleware(res, req, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.send(401).json({ message: "Invalid Token" });
    }
    req.user_id = decoded.id;
    next();
  });
}

export default authMiddleware;
