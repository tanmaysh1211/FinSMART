import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let token;

  //  Header token (normal APIs)
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  //  Query token (SSE)
  if (!token && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // if (req.path.includes("chat-stream")) {
  // req.user = { id: decoded.id };
  // return next();
// }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    // next();

    req.user = { id: decoded.id };
    return next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
