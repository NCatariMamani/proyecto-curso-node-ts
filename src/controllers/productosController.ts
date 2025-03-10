import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/producto';


export const createProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, precio, estado, departamento } = req.body;
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

        const producto = await prisma.create({
            data: {
                nombre, precio, estado, departamento, created_at: new Date().toISOString(), updated_at: varnull
            }
        })
        res.status(201).json(producto)

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallProductos = async (req: Request, res: Response): Promise<void> => {
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
            } else if (op === '$eq') {
                where[field] = Number(filterValue);
            }
        }
    }


    try {
        const productos = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                created_at: 'desc'
            }, include: {
                productoCompras: true,
                productoInventarios: true,
                productoVentas: true,
            }
        });
        const totalRecords = await prisma.count({ where });
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: productos,
            count: totalRecords
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getallProductosById = async (req: Request, res: Response): Promise<void> => {
    const productoId = parseInt(req.params.id)
    try {
        const producto = await prisma.findUnique({
            where: {
                id: productoId
            }
        })
        if (!producto) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }
        res.status(200).json(producto)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const updateProducto = async (req: Request, res: Response): Promise<void> => {
    const productoId = parseInt(req.params.id)
    const { nombre, precio, estado, departamento } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (nombre) {
            dataToUpdate.nombre = nombre
        }
        if (precio) {
            dataToUpdate.precio = precio
        }
        if (estado) {
            dataToUpdate.estado = estado
        }
        if (departamento) {
            dataToUpdate.departamento = departamento
        }
        dataToUpdate.updated_at = new Date().toISOString()

        const producto = await prisma.update({
            where: {
                id: productoId
            }, data: dataToUpdate
        })
        res.status(200).json(producto)
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

export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
    const productoId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: productoId
            }
        })
        res.status(200).json({
            message: `El usuario ${productoId} ha sido eliminado`
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

export const getAllProducInven = async (req: Request, res: Response): Promise<void> => {
    const productoId = parseInt(req.params.id);
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        let where: { [key: string]: any } = {
            productoInventarios: {
                some: {
                    inventarios: {
                        alojamientos: {
                            id: productoId
                        }
                    }
                }
            }

        };

        const producto = await prisma.findMany({
            skip: skip,
            take: limit,
            select: {
                id: true,
                nombre: true,
                precio: true,
                productoInventarios: {
                    select: {
                        id: true,
                        stock: true
                    }
                }
            },
            where: where
        });

        if (!producto) {
            res.status(404).json({ error: 'El alojamiento no fue encontrado' })
            return
        }

        const totalRecords = await prisma.count({ where });
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: producto,
            count: totalRecords
        })
        //res.status(200).json(producto)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}