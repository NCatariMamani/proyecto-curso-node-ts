import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/productoCompra';


export const createProductoCompra = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productoId, alojamientoId } = req.body;
        /*if(!email) {
            res.status(404).json({message: 'El email es obligatorio'})
            return
         }
         if(!password){
            res.status(404).json({message: 'El password es obligatorio'})
            return
        } */
        //const hashedPassword = await hashPasword(password)
        const varnull:any = null

        const productoCompra = await prisma.create({
            data: {
                productoId ,alojamientoId, created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(productoCompra)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallProductoCompras = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    try {
        const productoCompras = await prisma.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        })
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: productoCompras
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallProductoCompraById = async (req: Request, res: Response): Promise<void> => {
    const productoId = parseInt(req.params.id)
    try {
        const productoCompra = await prisma.findUnique({
            where: {
                id: productoId
            }
        })
        if (!productoCompra) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(productoCompra)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateProductoCompra = async (req: Request, res: Response): Promise<void> => {
    const productoCompraId = parseInt(req.params.id)
    const { nombre, precio } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (nombre) {
            dataToUpdate.nombre = nombre
        }
        if (precio) {
            dataToUpdate.precio = precio
        }
        dataToUpdate.updated_at = new Date().toISOString()

        const productoCompra = await prisma.update({
            where: {
                id: productoCompraId
            }, data: dataToUpdate
        })
        res.status(200).json(productoCompra)
    } catch (error: any) {
        if (error?.code === 'P2025') {
            res.status(400).json({ error: 'Alojamiento no encontrado' })
            return
        } else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
            return
        }

    }
}

export const deleteProductoCompra = async (req: Request, res: Response): Promise<void> => {
    const productoCompraId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: productoCompraId
            }
        })
        res.status(200).json({
            message: `El usuario ${productoCompraId} ha sido eliminado`
        }).end()
    } catch (error: any) {
        if (error?.code === 'P2025') {
            res.status(400).json({ error: 'Usuario no encontrado' })
            return
        } else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
            return
        }
    }
}