import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import Jwt  from 'jsonwebtoken';


export const registerController = async (req, res) => {
    try {
      const { name,lname, email, password, phone, address,apartement,governorate,city,postalCode } = req.body;
      //validations
      if (!name) {
        return res.send({ message: "First Name is Required" });
      };
      if (!lname) {
        return res.send({ message: "Last Name is Required" });
      };
      if (!email) {
        return res.send({ message: "Email is Required" });
      };
      if (!password) {
        return res.send({ message: "Password is Required" });
      };
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      };
      if (!address) {
        return res.send({ message: "Address is Required" });
      };
      if (!apartement) {
        return res.send({ message: "Apartement is Required" });
      };
      if (!governorate) {
        return res.send({ message: "Governorate is Required" });
      };
      if (!city) {
        return res.send({ message: "City is Required" });
      };
      if (!postalCode) {
        return res.send({ message: "Postal code is Required" });
      };


    const existingUser = await userModel.findOne({email});

    if(existingUser){
        return res.status(200).send({
            succcess:false,
            message:'Already have an account please login ',
        });
    };
    const hashedPassword= await hashPassword(password);
    const user = await userModel({name,lname,email,phone,address,city,governorate,postalCode,apartement,password:hashedPassword}).save();
    res.status(201).send({
        succcess:true,
        message:'User Register Successfully',
        user,
    });
    
} catch(error){
    console.log(error);
    res.status(500).send({
        succcess:false,
        message:'Error in Registration',
        error,
    });

}

};


export const loginController =async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                succcess:false,
                message:'Invalid Email or Password!',
            });
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                succcess:false,
                message:'Email is not registered',

            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                succcess:false,
                message:'Invalid Password',

            });
        }
        const token =  Jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d',});
        res.status(200).send({
            succcess:true,
            message:'login successfully',
            user:{
                name:user.name,
                lname:user.lname,
                city:user.city,
                governorate:user.governorate,
                postalCode:user.postalCode,
                apartement:user.apartement,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        });


    } catch(error){
        console.log(error);
        res.status(500).send({
            succcess:false,
            message:'Error in login',
            error,
        });
    }
};

export const testController = (req,res) =>{
    try{
        res.send("Protected Routes");
    }catch(error){
        console.log(error);
        res.send({error});
    }
};

export const updateProfileController = async (req, res) => {
    try {
      const { name,lname, email, password, address, phone,city,governorate,postalCode } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
          city: city || user.city,
          lname: lname || user.lname,
          governorate: governorate || user.governorate,
          postalCode: postalCode || user.postalCode,

        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Geting Orders",
        error,
      });
    }
  };
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

 