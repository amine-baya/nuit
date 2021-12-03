import express from 'express';
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import morgan from 'morgan'
import userRoutes from'./routes/userRoutes.js';
import uploadRoutes from'./routes/uploadRoutes.js'; 


import { NotFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config() 

connectDB() 

const app = express()

if(process.env.NODE_ENV === 'developement'){
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())


app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes) 




const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))  

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


app.use(NotFound)
 
app.use(errorHandler)

const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log(`server runing in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))