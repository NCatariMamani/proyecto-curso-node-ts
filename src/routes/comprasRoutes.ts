import express, { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { createCompra, deleteCompra, getallCompras, getallComprasById, updateCompra } from '../controllers/comprasController';

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

router.post('/', authenticateToken, createCompra)
router.get('/', authenticateToken,  getallCompras)
router.get('/:id', authenticateToken,  getallComprasById)
router.put('/:id', authenticateToken,  updateCompra)
router.delete('/:id', authenticateToken,  deleteCompra)


export default router;