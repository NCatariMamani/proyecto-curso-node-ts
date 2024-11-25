import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/habitacion';


export const createHabitacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { noHabitacion, preferencias, estado, alojamientoId } = req.body;
        /*if(!email) {
            res.status(404).json({message: 'El email es obligatorio'})
            return
         }
         if(!password){
            res.status(404).json({message: 'El password es obligatorio'})
            return
        } */
        //const hashedPassword = await hashPasword(password)
        const varnull: any = null

        const habitacion = await prisma.create({
            data: {
                noHabitacion, preferencias, estado, alojamientoId, created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(habitacion)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallHabitaciones = async (req: Request, res: Response): Promise<void> => {
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
            } else {

                if (op === '$ilike') {
                    where[field] = {
                        contains: filterValue,
                        mode: 'insensitive' // Para búsqueda case-insensitive
                    };
                } else if (op === '$eq') {
                    where[field] = Number(filterValue);
                }
            }
        }
    }

    try {
        const habitaciones = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                created_at: 'desc'
            }, include: {
                alojamientos: true // Incluye los detalles del alojamiento
            }
        })
        const totalRecords = await prisma.count({ where });

        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: habitaciones,
            count: totalRecords
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallHabitacionesById = async (req: Request, res: Response): Promise<void> => {
    const habitacionId = parseInt(req.params.id)
    try {
        const habitacion = await prisma.findUnique({
            where: {
                id: habitacionId
            }
        })
        if (!habitacion) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(habitacion)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateHabitacion = async (req: Request, res: Response): Promise<void> => {
    const habitacionId = parseInt(req.params.id)
    const { noHabitacion, preferencias, estado, alojamientoId } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (noHabitacion) {
            dataToUpdate.noHabitacion = noHabitacion
        }
        if (preferencias) {
            dataToUpdate.preferencias = preferencias
        }
        if (estado) {
            dataToUpdate.estado = estado
        }
        if (alojamientoId) {
            dataToUpdate.alojamientoId = alojamientoId
        }
        dataToUpdate.updated_at = new Date().toISOString()

        const habitacion = await prisma.update({
            where: {
                id: habitacionId
            }, data: dataToUpdate
        })
        res.status(200).json(habitacion)
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

export const deleteHabitacion = async (req: Request, res: Response): Promise<void> => {
    const habitaconId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: habitaconId
            }
        })
        res.status(200).json({
            message: `El usuario ${habitaconId} ha sido eliminado`
        }).end()
    } catch (error: any) {
        if (error?.code === 'P2025') {
            res.status(400).json({ error: 'Usuario no encontrado' })
            return
        } else if (error?.code === 'P2003') {
            res.status(409).json({ error: 'No se puede completar la operación debido a una restricción de clave externa.' })
            return
        } else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
            return
        }
    }
}


export const getAllHabitacionUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    //let where: { [key: string]: any } = {};

    let where: { [key: string]: any } = {
        alojamientos: {
            encargados: {
                some: {
                    userId: userId,
                },
            },
        },
    };

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
            } else if (op === '$eq') {
                where[field] = Number(filterValue);
            }
        }
    }


    try {

        const habitacion = await prisma.findMany({
            select: {
                id: true,
                noHabitacion: true,
                preferencias: true,
                estado: true,
            },
            where:where,
            orderBy: {
                noHabitacion: 'asc',  // Ordenar por el número de la habitación
            },
        });

        const totalRecords = await prisma.count({ where });

        console.log(totalRecords);

        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: habitacion,
            count: totalRecords
        })
        if (!habitacion) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}