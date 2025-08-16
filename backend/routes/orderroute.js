import express from "express";
import authmiddleware from "../middleware/auth.js";
import { allorders, placeorder, updateStatus, usersorder } from "../controllers/ordercontroller.js";
const orderrouter = express.Router();
orderrouter.post("/place",authmiddleware,placeorder)
orderrouter.post("/userorder",authmiddleware,usersorder)
orderrouter.get("/list",allorders)
orderrouter.post("/status",updateStatus)
export default orderrouter