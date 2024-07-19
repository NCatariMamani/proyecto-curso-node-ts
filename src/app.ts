import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/userRoutes';
import alojamientosRoutes from './routes/alojamientosRoutes';

const app = express();

app.use(express.json())

//Routes
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/alojamientos', alojamientosRoutes)
//Hacer una api rest de usuarios


console.log("Esto esta siendo ejecutado");
 
export default app