import { Request, Response } from 'express';
import { comparePasswords, hashPasword } from '../services/password.service';
import prisma from '../models/user';
import { generateToken } from '../services/auth.service';


export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if(!email) {
            res.status(404).json({message: 'El email es obligatorio'})
            return
         }
         if(!password){
            res.status(404).json({message: 'El password es obligatorio'})
            return
        } 
        const hashedPassword = await hashPasword(password)
        console.log(hashedPassword)
        const users = await prisma.create({
            data: { email, password: hashedPassword}
        })
        const token = generateToken(users)
        res.status(200).json({token})
    } catch (error: any) {
        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }
        console.log(error);
        res.status(500).json({error: 'Hubo un error en el registro'})
    }

}

export const login = async (req:Request, res:Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if(!email) {
            res.status(404).json({message: 'El email es obligatorio'})
            return
         }
         if(!password){
            res.status(404).json({message: 'El password es obligatorio'})
            return
        } 

        const user = await prisma.findUnique({where: {email}})
        if(!user){
            res.status(404).json({error: 'Usuario no encontrado'})
            return
        }

        const passwordMatch = await comparePasswords(password, user.password)// comparador de contraseñas
        if(!passwordMatch){
            res.status(401).json({error: 'Usuario y contraseña no coinciden'})
            return
        }

        const token = generateToken(user)
        res.status(200).json({token})

    } catch (error) {
        console.log(error)
    }
}

