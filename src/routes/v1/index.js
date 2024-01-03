const express =require('express')
const router=express.Router()
const UserApiRoutes=require("./userRoutes")
const productRoutes=require("./productRoutes")
const dishRoutes=require("./dishRoutes")
const orderRoutes=require("./orderRoutes")


router.use("/user",UserApiRoutes)
router.use('/product', productRoutes);
router.use('/dish', dishRoutes);
router.use('/order', orderRoutes);

module.exports=router