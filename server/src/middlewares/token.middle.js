import jwt from "jsonwebtoken";

const VerifyJWT = async (req, res, next) => {
  const token =
    req.body.token || req.params.token || req.headers["x-access-token"];

  if (!token)
    return res.status(401).json({ message: "token is missing", status: false });

  jwt.verify(token, "token", (err, decode) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.cookies = decode;
    next();
  });
};

export default VerifyJWT;