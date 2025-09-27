import mongoose, { mongo } from "mongoose";
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

    validate: {
      validator: function (v) {
        return validator.isEmail(v) && v.endsWith("@gmail.com");
      },
      message: (props) => `${props.value} is not a valid Gmail address!`,
    },

  },
  password: {
    type: String,
    required: [true, "please enter your password."],
    minlength: [8, "your password is shorter than 8 characters."],
  },

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ice Cream'
    }
  ]
 

});

// Before save and create
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
}); 


// Check login email and password
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
