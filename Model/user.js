import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const DBURL =
  "mongodb+srv://kamranshakib371:ZC7e8K4dAHxwHgE@cluster0.zztg2xz.mongodb.net/userAuth?retryWrites=true&w=majority&appName=Cluster0";
   
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

// After save and created
userSchema.post("save", function (doc, next) {
  console.log("new user was created and saved.", doc);

  next();
});

const User = mongoose.model("user-auth", userSchema);
export default User;
