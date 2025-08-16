import mongoose from "mongoose";
export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://nimrat628:v78L3vpAKmf3iiAq@cluster0.tqinkji.mongodb.net/foodingo').then(()=>console.log("db connected"));

}