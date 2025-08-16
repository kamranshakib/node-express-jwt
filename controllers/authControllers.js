
import User from "../Model/user.js"
 export const login = (req,res)=>{
    res.render('login')
}

export const signup = (req,res)=>{
    res.render('signup')
}

export const login_post = (req,res)=>{
    res.send('new login')
}

 export const signup_post = async (req,res)=>{
    try {
        const {email, password} = await req.body;
        const newUser = await User.create({email,password});
        res.status(200).json({
            user: newUser
        })
        
    } catch (err) {
        res.status(500).json({
            msg: 'user can not created',
            err: err.message
        })
        
    }
}