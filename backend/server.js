import express from "express";
const app = express();
const port = 5000;
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userroute.js";
import 'dotenv/config'
import cartrouter from "./routes/cartroute.js";
import orderrouter from "./routes/orderroute.js";
app.use(cors());
app.use(express.json());
// db connection
connectDB();
//api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartrouter);
app.use("/api/order",orderrouter)
app.get("/", (req, res) => {
  console.log("Homepage was hit");
  res.send("Server Updated!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});