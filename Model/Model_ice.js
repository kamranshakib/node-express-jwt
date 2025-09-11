import mongoose from "mongoose";


const iceCreamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    Flavor:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true

    },
    Price: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
    
})

const ICECREAM = new mongoose.model('Ice Cream',iceCreamSchema)
export default ICECREAM;