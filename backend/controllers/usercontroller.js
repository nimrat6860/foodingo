import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
//login user
const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect pasword" });
    }
    const token = createtoken(user._id);
    return res.json({ success: true, token});

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "error" });

    }
};
//register user
const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const registeruser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //if already exits
    const exits = await userModel.findOne({ email });
    if (exits) {
      return res.json({ success: false, message: "user already exists" });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const newuser = new userModel({
      name: name,
      email: email,
      password: hashedpass,
    });
    const user = await newuser.save();
    const token = createtoken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: "error" });
  }
};
export { loginuser, registeruser };
