import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/encargado';


export const createEncargado = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre,paterno, materno, ci, ext, celular, alojamientoId, userId } = req.body;
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

        const encargado = await prisma.create({
            data: {
                nombre,paterno,materno,ci,ext,celular,alojamientoId, userId, created_at: new Date().toISOString(), updated_at: varnull 
            }
        })
        res.status(201).json(encargado)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallEncargados = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    try {
        const encargados = await prisma.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        })
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: encargados
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallEncargadosById = async (req: Request, res: Response): Promise<void> => {
    const encargadoId = parseInt(req.params.id)
    try {
        const encargado = await prisma.findUnique({
            where: {
                id: encargadoId
            }
        })
        if (!encargado) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(encargado)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateEncargado = async (req: Request, res: Response): Promise<void> => {
    const encargadoId = parseInt(req.params.id)
    const { nombre,paterno, materno, ci, ext, celular, alojamientoId, userId } = req.body;
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
        if (ci) {
            dataToUpdate.ci = ci
        }
        if (ext) {
            dataToUpdate.ext = ext
        }
        if (celular) {
            dataToUpdate.celular = celular
        }
        if (alojamientoId) {
            dataToUpdate.alojamientoId = alojamientoId
        }
        if (userId) {
            dataToUpdate.ci = userId
        }

        dataToUpdate.updated_at = new Date().toISOString()

        const encargado = await prisma.update({
            where: {
                id: encargadoId
            }, data: dataToUpdate
        })
        res.status(200).json(encargado)
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

export const deleteEncargado = async (req: Request, res: Response): Promise<void> => {
    const encargadoId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: encargadoId
            }
        })
        res.status(200).json({
            message: `El usuario ${encargadoId} ha sido eliminado`
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