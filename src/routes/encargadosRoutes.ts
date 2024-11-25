import express, { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { createEncargado, deleteEncargado, getallEncargados, getallEncargadosById, updateEncargado,getByIdEncargadoUser } from '../controllers/encargadosController';

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

router.post('/', authenticateToken, createEncargado)
router.get('/', authenticateToken,  getallEncargados)
router.get('/:id', authenticateToken,  getallEncargadosById)
router.put('/:id', authenticateToken,  updateEncargado)
router.delete('/:id', authenticateToken,  deleteEncargado)
router.get('/getByEncargadoUser/:id', authenticateToken,  getByIdEncargadoUser)

export default router;