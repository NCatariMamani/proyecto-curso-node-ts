import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { createPermission, deletePermission, getAllPermission, getAllPermissionById, updatePermission } from '../controllers/permissionController';
import prisma from '../models/user';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';


//Middleware de JWT para ver si estamos autenticados

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error en la autenticación: ', err)
      return res.status(403).json({ error: 'No tienes acceso a este recurso' })
    }
    const decod = (decoded as any);
    console.log(decod.id);

    next();
  })
}

const authorizePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token) {
        const decod: any = jwt.verify(token, JWT_SECRET);
        console.log(decod.id);
        const user = await prisma.findUnique({
          where: { id: decod.id },
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        });

        if (!user) {
          return res.status(403).json({ error: 'Usuario no encontrado' });
        }

        // Verifica si el usuario tiene el permiso requerido
        const hasPermission = user.role.permissions.some(
          (p: any) => p.permission.name === permission
        );

        if (!hasPermission) {
          return res.status(403).json({ error: 'No tienes permisos para esta acción' });
        }

        next();
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en la autorización' });
    }
  };
};

router.post('/', authenticateToken, authorizePermission('CREATE_PERMISSION'), createPermission)
router.get('/', authenticateToken, authorizePermission('GETALL_PERMISSION'),getAllPermission)
router.get('/:id', authenticateToken, authorizePermission('GETID_PERMISSION'),getAllPermissionById)
router.put('/:id', authenticateToken, authorizePermission('UPDATE_PERMISSION'), updatePermission)
router.delete('/:id', authenticateToken,authorizePermission('DELETE_PERMISSION'), deletePermission)
/*router.get('/getByIdAlojaCli/:id', authenticateToken,  getByIdAlojaClientes)
router.get('/getVentaCliente/:id', authenticateToken,  getAllVentaByIdClient)*/

export default router;