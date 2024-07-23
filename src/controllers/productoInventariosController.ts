import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/productoInventario';


export const createProductoInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cantidad, entrada, salida, stock, fecha, hora, productoId, alojamientoId } = req.body;
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

        const producto = await prisma.create({
            data: {
                cantidad, entrada, salida, stock, fecha, hora, productoId, alojamientoId, created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(producto)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallProductoInventarios = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    try {
        const productos = await prisma.findMany({
            skip: skip,
            take: limit,
        })
        res.status(200).json(productos)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallProductoInventariosById = async (req: Request, res: Response): Promise<void> => {
    const productoInvenId = parseInt(req.params.id)
    try {
        const productoInven = await prisma.findUnique({
            where: {
                id: productoInvenId
            }
        })
        if (!productoInven) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(productoInven)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateProductoInventario = async (req: Request, res: Response): Promise<void> => {
    const productoInvenId = parseInt(req.params.id)
    const { cantidad, entrada, salida, stock, fecha, hora, productoId, alojamientoId } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (cantidad) {
            dataToUpdate.cantidad = cantidad
        }
        if (entrada) {
            dataToUpdate.entrada = entrada
        }
        if (salida) {
            dataToUpdate.salida = salida
        }
        if (stock) {
            dataToUpdate.stock = stock
        }
        if (fecha) {
            dataToUpdate.fecha = fecha
        }
        if (hora) {
            dataToUpdate.hora = hora
        }
        if (productoId) {
            dataToUpdate.productoId = productoId
        }
        if (alojamientoId) {
            dataToUpdate.alojamientoId = alojamientoId
        }
        dataToUpdate.updated_at = new Date().toISOString()

        const productoInven = await prisma.update({
            where: {
                id: productoInvenId
            }, data: dataToUpdate
        })
        res.status(200).json(productoInven)
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

export const deleteProductoInventario = async (req: Request, res: Response): Promise<void> => {
    const productoInvenId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: productoInvenId
            }
        })
        res.status(200).json({
            message: `El usuario ${productoInvenId} ha sido eliminado`
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