import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const DBURL = process.env.DB_URL;

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err.message));

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: [true, "enter another email address"],
    validate: [validator.isEmail, "enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password."],
    minlength: [8, "your passwoed is small then 8 char.."],
  },
});

// Befor save and create
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
// cheak login email and passoword
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }

  throw Error("incorrect email");
};

const User = mongoose.model("user-auth", userSchema);
export default User;
