import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/alojamiento';


export const createAloja = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, direccion, noHabitaciones } = req.body;
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

        const aloja = await prisma.create({
            data: {
                nombre, direccion, noHabitaciones, created_at: new Date().toISOString(), updated_at: varnull
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
    try {
        const alojas = await prisma.findMany({
            skip: skip,
            take: limit,
        })
        res.status(200).json(alojas)
    } catch (error: any) {
        console.log(error);
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
        res.status(200).json(aloja)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateAloja = async (req: Request, res: Response): Promise<void> => {
    const alojaId = parseInt(req.params.id)
    const { nombre, direccion, noHabitaciones } = req.body
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