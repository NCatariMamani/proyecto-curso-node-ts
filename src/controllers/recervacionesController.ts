import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/recervacion';


export const createRecervacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, paterno, materno, edad, ci, extencion, nombreA, paternoA, maternoA, edadA, ciA, extencionA, fecha, horaEntrada, horaSalida, tiempo, compania, costoHabitacion, costoExtra, total, habitacionId, encargadoId } = req.body;
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

        const recervacion = await prisma.create({
            data: {
                nombre , paterno, materno, edad, ci, extencion, nombreA, paternoA, maternoA, edadA, ciA, extencionA, fecha, horaEntrada, horaSalida, tiempo, compania, costoHabitacion, costoExtra, total, habitacionId, encargadoId, created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(recervacion)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallRecervaciones = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    try {
        const recervaciones = await prisma.findMany({
            skip: skip,
            take: limit,
        })
        res.status(200).json(recervaciones)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallRecervacionById = async (req: Request, res: Response): Promise<void> => {
    const recervacionId = parseInt(req.params.id)
    try {
        const recervaciones = await prisma.findUnique({
            where: {
                id: recervacionId
            }
        })
        if (!recervaciones) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(recervaciones)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateRecervacion = async (req: Request, res: Response): Promise<void> => {
    const recervacionId = parseInt(req.params.id)
    const { nombre, paterno, materno, edad, ci, extencion, nombreA, paternoA, maternoA, edadA, ciA, extencionA, fecha, horaEntrada, horaSalida, tiempo, compania, costoHabitacion, costoExtra, total, habitacionId, encargadoId } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (nombre) {
            dataToUpdate.nombre = nombre
        }
        if (paterno) {
            dataToUpdate.paterno = paterno
        }
        if (materno) {
            dataToUpdate.materno = materno
        }
        if (edad) {
            dataToUpdate.edad = edad
        }
        if (ci) {
            dataToUpdate.ci = ci
        }
        if (extencion) {
            dataToUpdate.extencion = extencion
        }
        if (nombreA) {
            dataToUpdate.nombreA = nombreA
        }
        if (paternoA) {
            dataToUpdate.paternoA = paternoA
        }
        if (maternoA) {
            dataToUpdate.maternoA = maternoA
        }
        if (edadA) {
            dataToUpdate.edadA = edadA
        }
        if (ciA) {
            dataToUpdate.ciA = ciA
        }
        if (extencionA) {
            dataToUpdate.extencionA = extencionA
        }
        if (fecha) {
            dataToUpdate.fecha = fecha
        }
        if (horaEntrada) {
            dataToUpdate.horaEntrada = horaEntrada
        }
        if (horaSalida) {
            dataToUpdate.horaSalida = horaSalida
        }
        if (tiempo) {
            dataToUpdate.tiempo = tiempo
        }
        if (compania) {
            dataToUpdate.compania = compania
        }
        if (costoHabitacion) {
            dataToUpdate.costoHabitacion = costoHabitacion
        }
        if (costoExtra) {
            dataToUpdate.costoExtra = costoExtra
        }
        if (total) {
            dataToUpdate.total = total
        }
        if (habitacionId) {
            dataToUpdate.habitacionId = habitacionId
        }
        if (encargadoId) {
            dataToUpdate.encargadoId = encargadoId
        }
        dataToUpdate.updated_at = new Date().toISOString()

        const recervaciones = await prisma.update({
            where: {
                id: recervacionId
            }, data: dataToUpdate
        })
        res.status(200).json(recervaciones)
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

export const deleteRecervacion = async (req: Request, res: Response): Promise<void> => {
    const recervacionId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: recervacionId
            }
        })
        res.status(200).json({
            message: `El usuario ${recervacionId} ha sido eliminado`
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