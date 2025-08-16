import jwt from "jsonwebtoken";
const authmiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorised" });
  }
  try {
    const tokendecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokendecode.id;
    next();
  } catch (error) {
    console.log("error");
    return res.json({ success: false, message: "error" });
  }
};
export default authmiddleware;
