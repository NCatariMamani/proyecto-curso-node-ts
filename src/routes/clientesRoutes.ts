import express, { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken'
import { createCliente, deleteCliente, getallClientes, getallClienteById, updateCliente,getByIdAlojaClientes,getAllVentaByIdClient } from '../controllers/clientesController';

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

router.post('/', authenticateToken, createCliente)
router.get('/', authenticateToken,  getallClientes)
router.get('/:id', authenticateToken,  getallClienteById)
router.put('/:id', authenticateToken,  updateCliente)
router.delete('/:id', authenticateToken,  deleteCliente)
router.get('/getByIdAlojaCli/:id', authenticateToken,  getByIdAlojaClientes)
router.get('/getVentaCliente/:id', authenticateToken,  getAllVentaByIdClient)

export default router;