import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/venta';


export const createVenta = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fecha, reservacionId } = req.body;
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

        const venta = await prisma.create({
            data: {
                fecha, reservacionId, created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(venta)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallVentas = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    try {
        const ventas = await prisma.findMany({
            skip: skip,
            take: limit,
        })
        res.status(200).json(ventas)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallVentaById = async (req: Request, res: Response): Promise<void> => {
    const ventaId = parseInt(req.params.id)
    try {
        const venta = await prisma.findUnique({
            where: {
                id: ventaId
            }
        })
        if (!venta) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(venta)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateVenta = async (req: Request, res: Response): Promise<void> => {
    const ventaId = parseInt(req.params.id)
    const { fecha, reservacionId } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (fecha) {
            dataToUpdate.fecha = fecha
        }
        if (reservacionId) {
            dataToUpdate.reservacionId = reservacionId
        }
        dataToUpdate.updated_at = new Date().toISOString()

        const venta = await prisma.update({
            where: {
                id: ventaId
            }, data: dataToUpdate
        })
        res.status(200).json(venta)
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

export const deleteVenta = async (req: Request, res: Response): Promise<void> => {
    const ventaId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: ventaId
            }
        })
        res.status(200).json({
            message: `El usuario ${ventaId} ha sido eliminado`
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