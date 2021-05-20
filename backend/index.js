require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const userRoute = require('./routes/user.route')

const app = express()

app.use(express.json({extended: false}))

app.use('/users', userRoute)

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if(err) throw err
  console.log("Connected to database");

  app.listen(PORT, () =>  console.log("The server has started on port " + PORT))
})