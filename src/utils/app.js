import express from 'express'
import authRoutes from '../routes/authRoutes.js';
import libraryRoutes from '../routes/libraryRoutes.js';
import authMiddleware from '../middleware/authMiddleware.js';
const app = express();
const PORT = process.env.PORT || 5500

//Middleware
app.use(express.json())



// Routes
app.use('/auth',authRoutes,authMiddleware)
app.use('/books',libraryRoutes)



app.listen(PORT,()=>{
    console.log(`app running on port : ${PORT}`)
})
