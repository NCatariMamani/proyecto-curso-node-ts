import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/compra';


export const createCompra = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fecha, alojamientoId } = req.body;
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

        const compra = await prisma.create({
            data: {
                fecha, alojamientoId, created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(compra)

    } catch (error: any) {
        if(error.code === 'P2003'){
            res.status(404).json({message: 'No existe Id de ese alojamiento'})
            return
        }
        console.log(error.code);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallCompras = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    let where: { [key: string]: any } = {};

    // Manejar el parámetro de filtro
    for (const key in req.query) {
        if (key.startsWith('filter.')) {
            const field = key.replace('filter.', '');
            const value = req.query[key] as string;
            const [op, filterValue] = value.split(':');

            if (op === '$ilike') {
                where[field] = {
                    contains: filterValue,
                    mode: 'insensitive' // Para búsqueda case-insensitive
                };
            }else if (op === '$eq') {
                where[field] = Number(filterValue);
            }else if (op === '$gte') {
                where[field] = {
                    gte: new Date(filterValue)
                };
            } else if (op === '$lte') {
                where[field] = {
                    lte: new Date(filterValue)
                };
            }
        }
    }

    try {

        
        const compras = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                created_at: 'desc'
            },include: {
                alojamientos: true // Incluye los detalles del alojamiento
            }
        });
        const totalRecords = await prisma.count({ where });
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: compras,
            count: totalRecords
        });
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallComprasById = async (req: Request, res: Response): Promise<void> => {
    const compraId = parseInt(req.params.id)
    try {
        const compra = await prisma.findUnique({
            where: {
                id: compraId
            }
        })
        if (!compra) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(compra)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateCompra = async (req: Request, res: Response): Promise<void> => {
    const compraId = parseInt(req.params.id)
    const { fecha, alojamientoId } = req.body
    try {
        let dataToUpdate: any = { ...req.body }
        if (fecha) {
            dataToUpdate.fecha = fecha
        }
        if (alojamientoId) {
            dataToUpdate.alojamientoId = alojamientoId
        }

        dataToUpdate.updated_at = new Date().toISOString()

        const compra = await prisma.update({
            where: {
                id: compraId
            }, data: dataToUpdate
        })
        res.status(200).json(compra)
    } catch (error: any) {
        if (error?.code === 'P2025') {
            res.status(400).json({ error: 'Alojamiento no encontrado' })
            return
        } else if (error?.code === 'P2003') {
            console.log(error);
            res.status(500).json({ error: 'No existe Id de ese alojamiento' })
            return
        } else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
            return
        }

    }
}

export const deleteCompra = async (req: Request, res: Response): Promise<void> => {
    const compraId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: compraId
            }
        })
        res.status(200).json({
            message: `El usuario ${compraId} ha sido eliminado`
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