import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateToken from "../config/token.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const signUp = async (req, res)=> {
    try {
        const {firstName,lastName,email,password,userName} = req.body

        if(!firstName || !lastName || !email || !password || !userName){
            return res.status(400).json({message: "send all details"})
        }
        let profileImage;
        if(req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }
        let existUser = await User.findOne({email})
        if(existUser) {
            return res.status(400).json({message: "User already exist"})
        }

        const hashedPassword= await bcrypt.hash(password,10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            userName,
            profileImage
        })

        let token;
        try {
            token = generateToken(user._id)
        } catch(error){
            console.log(error)
        }
        
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite:"lax",
            path:"/",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json({user:{
            firstName,
            lastName,
            email,
            userName,
            profileImage
        }})

    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const login = async (req,res)=> {
    try {
        const {email,password} = req.body
        let existUser = await User.findOne({email})
        if(!existUser) {
            return res.status(400).json({message: "user does not exist"})
        }

            let match =await bcrypt.compare(password,existUser.password)
            if(!match) {
                return res.status(400).json({message:"Incorrect Password"})
            }

        let token;
        try {
            token = generateToken(existUser._id)
        } catch(error){
            console.log(error)
        }
        
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite:"lax",
            path:"/",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({user:{
            firstName:existUser.firstName,
            lastName:existUser.lastName,
            email:existUser.email,
            userName:existUser.userName,
            profileImage:existUser.profileImage
        }})

    } catch (error) {
        return res.status(500).json(error)
    }

}

export const logout = async (req,res) => {
    try {
            res.clearCookie("token", { path:"/" })
            res.status(200).json({message:"Logout Successfully"})
    } catch(error) {
        res.status(500).json(error)
    }
}

export const getUserData = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user) {
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({user:{
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            userName:user.userName,
            profileImage:user.profileImage
        }})
    } catch(error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}