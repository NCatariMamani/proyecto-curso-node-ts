import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/alojamiento';


export const createAloja = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, direccion, noHabitaciones, departamento } = req.body;
        const varnull: any = null

        const aloja = await prisma.create({
            data: {
                nombre, direccion, noHabitaciones,departamento ,created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(aloja)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallAlojas = async (req: Request, res: Response): Promise<void> => {
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
            }
        }
    }


    console.log('Filters:', req.query);
    console.log('Where clause:', where);


    try {

        const alojas = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                created_at: 'desc'
            },include: {
                compras: true,
                encargados: true,
                habitaciones: true,
                inventarios: true,
                reservaciones: true// Incluye los detalles del alojamiento
            }
        })

        const totalRecords = await prisma.count({ where });
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: alojas,
            count: totalRecords
        })
    } catch (error: any) {
        //console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallAlojasById = async (req: Request, res: Response): Promise<void> => {
    const alojaId = parseInt(req.params.id)
    try {
        const aloja = await prisma.findUnique({
            where: {
                id: alojaId
            }
        })
        if (!aloja) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: aloja
        })
    } catch (error: any) {
        //console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateAloja = async (req: Request, res: Response): Promise<void> => {
    const alojaId = parseInt(req.params.id)
    const { nombre, direccion, noHabitaciones, departamento } = req.body
    try {
        let dataToUpdate: any = { ...req.body }
        if (nombre) {
            dataToUpdate.nombre = nombre
        }
        if (direccion) {
            dataToUpdate.direccion = direccion
        }
        if (noHabitaciones) {
            dataToUpdate.noHabitaciones = noHabitaciones
        }
        if (departamento) {
            dataToUpdate.departamento = departamento
        }

        dataToUpdate.updated_at = new Date().toISOString()

        const aloja = await prisma.update({
            where: {
                id: alojaId
            }, data: dataToUpdate
        })
        res.status(200).json(aloja)
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

export const deleteAloja = async (req: Request, res: Response): Promise<void> => {
    const alojaId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: alojaId
            }
        })
        res.status(200).json({
            message: `El usuario ${alojaId} ha sido eliminado`
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