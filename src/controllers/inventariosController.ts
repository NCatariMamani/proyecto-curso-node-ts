import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/inventario';


export const createInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { descripcion, fecha, alojamientoId } = req.body;
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

        const inventarios = await prisma.create({
            data: {
                descripcion, fecha, alojamientoId,  created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(inventarios)

    } catch (error: any) {
        if(error?.code === 'P2003' ){
            res.status(404).json({message: 'Llave primaria no existe '})
            return
        }
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallInventarios = async (req: Request, res: Response): Promise<void> => {
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

            if (field.includes('.')) {
                const [relation, fieldName] = field.split('.');

                if (!where[relation]) {
                    where[relation] = {};
                }

                if (op === '$ilike') {
                    where[relation][fieldName] = {
                        contains: filterValue,
                        mode: 'insensitive' // Para búsqueda case-insensitive
                    };
                } else if (op === '$eq') {
                    where[relation][fieldName] = filterValue;
                }
            } else{
                if (op === '$ilike') {
                    where[field] = {
                        contains: filterValue,
                        mode: 'insensitive' // Para búsqueda case-insensitive
                    };
                } else if (op === '$eq') {
                    if (field === 'fecha') {
                        const date = String(filterValue);
                        const newDate = new Date(date);
                        if (date.toString() !== 'Invalid Date') {
                            // Ajuste para comparar solo la parte de la fecha
                            const startOfDay = new Date(newDate.setUTCHours(0, 0, 0, 0));
                            const endOfDay = new Date(newDate.setUTCHours(23, 59, 59, 999));
                            where[field] = {
                                gte: startOfDay,
                                lte: endOfDay
                            };
                        }
                    } else {
                        where[field] = Number(filterValue);
                    }
                }
            }

            
        }
    }

    try {
        const inventario = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                created_at: 'desc'
            }, include: {
                alojamientos: true,
                productoInventarios: true// Incluye los detalles del alojamiento
            }
        });
        const totalRecords = await prisma.count({ where });
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: inventario,
            count: totalRecords
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallInventariosById = async (req: Request, res: Response): Promise<void> => {
    const invenId = parseInt(req.params.id)
    try {
        const inventario = await prisma.findUnique({
            where: {
                id: invenId
            }
        })
        if (!inventario) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(inventario)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateInventario = async (req: Request, res: Response): Promise<void> => {
    const invenId = parseInt(req.params.id)
    const { descripcion, fecha, alojamientoId } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (descripcion) {
            dataToUpdate.descripcion = descripcion
        }
        if (fecha) {
            dataToUpdate.fecha = fecha
        }
        if (alojamientoId) {
            dataToUpdate.alojamientoId = alojamientoId
        }
        dataToUpdate.updated_at = new Date().toISOString()

        const inventario = await prisma.update({
            where: {
                id: invenId
            }, data: dataToUpdate
        })
        res.status(200).json(inventario)
    } catch (error: any) {
        if (error?.code === 'P2025') {
            res.status(400).json({ error: 'Alojamiento no encontrado' })
            return
        } else if (error?.code === 'P2003') {
            console.log(error);
            res.status(404).json({message: 'Llave primaria no existe '})
            return
        } else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
        }

    }
}

export const deleteInventario = async (req: Request, res: Response): Promise<void> => {
    const invenId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: invenId
            }
        })
        res.status(200).json({
            message: `El usuario ${invenId} ha sido eliminado`
        }).end()
    } catch (error: any) {
        if (error?.code === 'P2025') {
            res.status(400).json({ error: 'Usuario no encontrado' })
            return
        } else if(error?.code === 'P2003'){
            res.status(409).json({ error: 'No se puede completar la operación debido a una restricción de clave externa.' })
            return
        } else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
            return
        }
    }
}