import {Request, Response} from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/user';


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if(!email) {
            res.status(404).json({message: 'El email es obligatorio'})
            return
         }
         if(!password){
            res.status(404).json({message: 'El password es obligatorio'})
            return
        } 
        const hashedPassword = await hashPasword(password)
        const user = await prisma.create({
            data: {
                email,password: hashedPassword
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
    try {
        const users = await prisma.findMany()
        res.status(200).json(users)
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
        }else {
            console.log(error);
            res.status(500).json({error: 'Hubo un error, pruebe mas tarde'})
            return
        }
    }
}