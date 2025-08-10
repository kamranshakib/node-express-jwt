import mongoose from "mongoose";

const DBURL = 'mongodb+srv://kamranshakib371:ZC7e8K4dAHxwHgE@cluster0.zztg2xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DBURL)
.then(()=> console.log('Connected to Database'))
.catch((err)=> console.log(err.message))

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: [true, 'enter another email address']
    },
    password: {
        type: String,
        required: [true, 'please enter your password.'],
        minlength: [8,'your passwoed is small then 8 char..'],
    }


})

const User = mongoose.model('user-auth',userSchema);
export default User;