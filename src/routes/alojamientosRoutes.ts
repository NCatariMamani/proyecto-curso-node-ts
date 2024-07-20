import express, { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { createAloja, deleteAloja, getallAlojas, getallAlojasById, updateAloja } from '../controllers/alojamientosController';

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

router.post('/', authenticateToken, createAloja)
router.get('/', authenticateToken,  getallAlojas)
router.get('/:id', authenticateToken,  getallAlojasById)
router.put('/:id', authenticateToken,  updateAloja)
router.delete('/:id', authenticateToken,  deleteAloja)


export default router;