import ICECREAM from "../Model/Model_ice.js"

export const showDetails = async (req,res)=>{
    const iceCreamId = req.params.id;
    try {
        const ice = await ICECREAM.findById(iceCreamId);
        if(ice){
            res.render("detailsiceCream",{ice})
        }
        
    } catch (error) {
        res.status(400).json({error})
        
    }
    
}