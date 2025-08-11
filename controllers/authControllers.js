

 export const login = (req,res)=>{
    res.render('login')
}

export const signup = (req,res)=>{
    res.render('signup')
}

export const login_post = (req,res)=>{
    res.send('new login')
}

 export const signup_post = (req,res)=>{
    res.send('new signup')
}