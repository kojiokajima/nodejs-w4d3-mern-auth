const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user.model')

router.post('/register', async(req, res, next) => {
  let {email, password, confirmPassword, displayName} = req.body

  if(!email || !password || !confirmPassword){
    return res.status(400).json({msg: "Not all fields have been entered"})
  }

  if(password.length < 5){
    return res.status(400).json({msg: "The passwords needs to be at least 5 characters long"})
  }
  
  if(password !== confirmPassword)
  return res.status(400).json({msg: "The passwords do not match"})

  const existingUser = await User.findOne({email: email})
  if(existingUser){
    return res.status(400).json({msg: "An account with this email already exists"})
  }

  if(!displayName) displayName = email

  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

  const newUser = new User({
    email: email,
    password: passwordHash,
    displayName: displayName,
  })

  const savedUser = await newUser.save()
  res.json({msg: "Created new user", savedUser})
})


router.get('/', async (req, res, next) => {
  const user = await User.findById(req.user)
  if(!user){
    res.json({msg: "User doesn't exist"})
  } else {
    res.json({
      msg: "Hi There"
    })
  }

})

module.exports = router