import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category' , categoryRoutes);
app.use('/api/v1/product',productRoutes);


app.get("/", (req,res) => {
    res.send('<h1>ZeRa Store</h1>');

});

const PORT =process.env.PORT || 8080 ;
const mode = process.env.DEV_MODE ;



app.listen(PORT, () =>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT} `.bgMagenta.white);
});

