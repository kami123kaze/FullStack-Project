import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { response } from 'express'


const registerUser = asyncHandler( async (req,res)=>{
    const {fullName,email,username,password} =    req.body
    if([fullName,email,username,password].some((field)=>field?.trim()===""))
      {throw new ApiError(400,"all fields are compulsary")}

    const existedUser = User.findOne({
      $or :[{email},{username}]
    })

    if(existedUser){throw new ApiError(409,"email or password already exists")}

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath  = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar needed")
    }

   const avatar =  await uploadOnCloudinary(avatarLocalPath)
   const coverImage =  await uploadOnCloudinary(coverImageLocalPath)
   

   if(!avatar) {
    throw new ApiError(400,"avatar not able to be uploaded")
   }


   const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(createdUser){
    throw new ApiError(500,"server bad while registering user, my bad g")
   }
   
return res.status(201).json(
    new ApiResponse(200,createdUser,"user created succesfully yayyyy!")
)


})


export {
    registerUser,

}