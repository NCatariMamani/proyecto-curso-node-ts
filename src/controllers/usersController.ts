import {Request, Response} from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/user';


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password,roleId } = req.body;
        if(!email) {
            res.status(404).json({message: 'El email es obligatorio'})
            return
         }
         if(!password){
            res.status(404).json({message: 'El password es obligatorio'})
            return
        } 
        const varnull: any = null;
        const hashedPassword = await hashPasword(password);
        const date = new Date().toISOString();
        const user = await prisma.create({
            data: {
                email,password: hashedPassword, roleId: roleId
            }
        })
        res.status(201).json(user)
        
    } catch (error: any) {
        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }
        console.log(error);
        res.status(500).json({error: 'Hubo un error, pruebe mas tarde'})
    }
}

export const getallUsers = async (req: Request, res: Response): Promise<void> => {
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
        const users = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                id: 'desc'
            },include: {
                role: true,
            }
        });
        const totalRecords = await prisma.count({ where });


        

        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: users,
            count: totalRecords
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({error: 'Hubo un error, pruebe mas tarde'})
    }
}

export const getallUsersById = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    try {
        const user = await prisma.findUnique({
            where: {
                id: userId
            }
        })
        if(!user){
            res.status(404).json({error: 'El usuario no fue encontrado'})
            return 
        }
        res.status(200).json(user)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({error: 'Hubo un error, pruebe mas tarde'})
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    const {email, password} =req.body
    try {
        let dataToUpdate: any = {... req.body}

        if(password){
            const hashedPassword = await hashPasword(password)
            dataToUpdate.password = hashedPassword
        }

        if(email){
            dataToUpdate.email = email
        }
        dataToUpdate.updated_at = new Date().toISOString()
        const user = await prisma.update({
            where: {
                id: userId
            }, data: dataToUpdate
        })
        res.status(200).json(user)
    } catch (error: any) {
        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({error: 'El mail ingresado ya existe'})
            return
        }else if(error?.code === 'P2025'){
            res.status(400).json({error: 'Usuario no encontrado'})
            return
        }else {
            console.log(error);
            res.status(500).json({error: 'Hubo un error, pruebe mas tarde'})
            return
        }
        
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: userId
            }
        })
        res.status(200).json({
            message: `El usuario ${userId} ha sido eliminado`
        }).end()
    } catch (error: any) {
        if(error?.code === 'P2025'){
            res.status(400).json({error: 'Usuario no encontrado'})
            return
        } else if(error?.code === 'P2003'){
            res.status(409).json({ error: 'No se puede completar la operación debido a una restricción de clave externa.' })
            return
        } else {
            console.log(error);
            res.status(500).json({error: 'Hubo un error, pruebe mas tarde'})
            return
        }
    }
}