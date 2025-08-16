import orderModel from "../models/orderModel.js"; 
import userModel from "../models/usermodel.js";
// place order
const placeorder = async(req,res)=>{
try {
    const neworder = new orderModel({
        userId : req.body.userId,
        items: req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    await neworder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        res.json({ success: true, message: "Order placed successfully" });

} catch (error) {
    console.log("error")
    res.json({success:false,message:"error"})
}
}
//user order for frontend
const usersorder=async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log("error")
        res.json({success:false,message:"error"})
        
    }
}
// order of all users
const allorders=async(req,res)=>{
try {
    const orders =await orderModel.find({})
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
}
}
//api for updating order status
const updateStatus=async(req,res)=>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status}) 
    res.json({success:true,message:"status updated"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
}
}
export {placeorder,usersorder,allorders,updateStatus};