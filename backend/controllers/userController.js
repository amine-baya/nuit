import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js' 


const authUser = asyncHandler(async (req, res)=>{
  
    const {email, password} = req.body
    const user = await User.findOne({email})
     
    if(user){ 
      if ((await user.matchPassword(password))) {
        res.json({  
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
      } else {
        res.status(401) 
        throw new Error('Invalid  password')
      }
        
    }else{
        res.status(401) 
        throw new Error('Invalid email')
        
    }
    
})


const registerUser = asyncHandler(async (req, res)=>{ 
    const {firstName,lastName,phoneNumber,email,password} = req.body

    console.log(req.body);
    const userExists = await User.findOne({email}) 
     
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
         firstName,
         lastName,
         phoneNumber,
         email,
         password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            token: generateToken(user._id) 
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
    
})





const getUserProfile = asyncHandler(async (req, res)=>{
    
    const user = await User.findById(req.user._id)
      
    if(user){

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else {
        res.status(404)
        throw new Error('User not found ')
    }

})

const updateUserProfile = asyncHandler(async (req, res)=>{
    
    const user = await User.findById(req.user._id)
     
    if(user){
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email
        user.password = req.body.password ||  user.password
       
    
        const updatedUser = await user.save()
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else { 
        res.status(404)
        throw new Error('User not found ')
    }
})





// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})








export { authUser, registerUser, getUserProfile, updateUserProfile}