import User from "../Model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 
 
// jsonwebtoekn function
const maxAge = 20 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// error hundling function
const ErrorHundle = (err) => {
  console.log(err.message, err.code);

  let errors = { email: "", password: "" };

  if (err.message === "incorrect password") {
    errors.password = " that password is incorrect";
  }
 
  if (err.message === "incorrect email") {
    errors.email = " That email is not registered";
  }

  //duplicate errors code
  if (err.code === 11000) {
    errors.email = "that email is aleady registered";
  }

  if (err.message.includes("user-auth validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export const login = (req, res) => {
  res.render("login"); 
};

export const signup = (req, res) => { 
  res.render("signup");
};  
 
export const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
       sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      expires: new Date(Date.now() + maxAge * 1000),
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = ErrorHundle(err);
    res.status(400).json({ errors });
  } 
};
export const signup_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: { email: "This email is already registered!" } });
    }

    const newUser = await User.create({ email, password });

   
    const token = createToken(newUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      expires: new Date(Date.now() + maxAge * 1000),
    });

    res.status(200).json({ user: newUser._id });
    
  } catch (err) {
    const errors = ErrorHundle(err);
    res.status(500).json({ errors });
  }
};

export const logout = (req, res) => {
  // res.cookie('jwt','',{maxAge: 1})
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    expiresIn: new Date(0),
  });
  res.redirect("/");
};

 