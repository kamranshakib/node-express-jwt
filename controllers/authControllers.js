
import User from "../Model/user.js"



const ErrorHundle = (err)=>{
    console.log(err.message, err.code)

    let errors = {email:'',password: ''};
    
    //duplicate errors code
    if(err.code ===11000){
        errors.email = 'that email is aleady registered'
        return errors;
    }

    if(err.message.includes('user-auth validation failed')){
       Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path]= properties.message
       })

    }
    return errors;
}

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
      const errors =  ErrorHundle(err);
        res.status(500).json({errors})
        
    }
}