import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/permission';


export const createPermission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const varnull: any = null

        const permission = await prisma.create({
            data: {
                name
            }
        })
        res.status(201).json(permission)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getAllPermission= async (req: Request, res: Response): Promise<void> => {
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

        const permissions = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                id: 'asc'
            },include: {
                roles: true,
            }
        })

        const totalRecords = await prisma.count({ where });
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: permissions,
            count: totalRecords
        })
    } catch (error: any) {
        //console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getAllPermissionById = async (req: Request, res: Response): Promise<void> => {
    const permiId = parseInt(req.params.id)
    try {
        const permission = await prisma.findUnique({
            where: {
                id: permiId
            }
        })
        if (!permission) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: permission
        })
    } catch (error: any) {
        //console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updatePermission = async (req: Request, res: Response): Promise<void> => {
    const permiId = parseInt(req.params.id)
    const { name } = req.body
    try {
        let dataToUpdate: any = { ...req.body }
        if (name) {
            dataToUpdate.name = name
        }

        const permission = await prisma.update({
            where: {
                id: permiId
            }, data: dataToUpdate
        })
        res.status(200).json(permission)
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

export const deletePermission = async (req: Request, res: Response): Promise<void> => {
    const permiId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: permiId
            }
        })
        res.status(200).json({
            message: `El usuario ${permiId} ha sido eliminado`
        }).end()
    } catch (error: any) {
        if (error?.code === 'P2025') {
            res.status(400).json({ error: 'Usuario no encontrado' })
            return
        }
        else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
            return
        }
    }
}