import ICECREAM from "../Model/Model_ice.js"
import multer from "multer"




export const adminPage = (req,res)=>{
  res.render("admin")
}

export const adminPage_post = async (req,res)=>{
    try {
         console.log(req.body)
         console.log(req.file)
         res.send('okey')
        
    } catch (error) {
        console.log(error)
        
    }
   
    // const newIceCream = await ICECREAM.create(req.body)
    
}