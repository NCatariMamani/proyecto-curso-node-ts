import express, { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { createHabitacion, deleteHabitacion, getallHabitaciones, getallHabitacionesById, updateHabitacion,getAllHabitacionUser } from '../controllers/habitacionesController';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

//Middleware de JWT para ver si estamos autenticados

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({error: 'No autorizado'})
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            console.error('Error en la autenticación: ', err)
            return res.status(403).json({error: 'No tienes acceso a este recurso'})
        }
        next();
    })
}

router.post('/', authenticateToken, createHabitacion)
router.get('/', authenticateToken,  getallHabitaciones)
router.get('/:id', authenticateToken,  getallHabitacionesById)
router.put('/:id', authenticateToken,  updateHabitacion)
router.delete('/:id', authenticateToken,  deleteHabitacion)
router.get('/getAllHabUser/:id', authenticateToken,  getAllHabitacionUser)

export default router;