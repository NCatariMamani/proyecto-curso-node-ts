import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/rolPermissions';


export const createRolePermission = async (req: Request, res: Response): Promise<void> => {
    try {
        const permissions = req.body; // Recibimos un array de objetos [{roleId: 1, permiId: 2}, ...]
        console.log(req.body);
        const createdPermissions = await prisma.createMany({
            data: permissions,
            skipDuplicates: true // Evita duplicados
        });


        //res.status(201).json({ message: 'Permisos asignados', createdPermissions });

        /*const { permissions } = req.body; // [{ idRole: 1, idPermi: 2 }, { idRole: 1, idPermi: 3 }]

        const createdPermissions = await Promise.all(
            permissions.map(async ({ idRole, idPermi }) => {
                return prisma.create({
                    data: {
                        role: { connect: { id: idRole } }, 
                        permission: { connect: { id: idPermi } }
                    }
                });
            })
        );*/

        res.status(201).json({ message: 'Permisos asignados', createdPermissions });

    } catch (error: any) {
        /*if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(404).json({message: 'El mail ingresado ya existe'})
            return
        }*/
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}

export const getAllRolePermission = async (req: Request, res: Response): Promise<void> => {
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


    console.log('Filters:', req.query);
    console.log('Where clause:', where);


    try {

        const permissions = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                id: 'asc'
            }, include: {
                role: true,
                permission: true
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

export const getAllRolePermissionById = async (req: Request, res: Response): Promise<void> => {
    const roleId = parseInt(req.params.id)
    try {
        const permission = await prisma.findUnique({
            where: {
                id: roleId
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

export const updateRolePermission = async (req: Request, res: Response): Promise<void> => {
    const idRole = parseInt(req.params.id)
    const permissions = req.body
    try {
        /*let dataToUpdate: any = { ...req.body }
        if (name) {
            dataToUpdate.name = name
        }

        const permission = await prisma.update({
            where: {
                id: permiId
            }, data: dataToUpdate
        })
        res.status(200).json(permission)*/

        await prisma.deleteMany({ where: { roleId: idRole } });
        await prisma.createMany({ data: permissions, skipDuplicates: true });

        /*const { idRole, permissions } = req.body; // permissions = [{ idPermi: 2 }, { idPermi: 3 }]

        const updatedRole = await prisma.update({
            where: { id: idRole },
            data: {
                /*permission: {
                    set: permissions.map(({ permissionId }: { permissionId: number }) => ({ id: permissionId })) // Reemplaza completamente las relaciones              
                }
                permission: {
                    connect: permissions.map(({ permissionId }: { permissionId: number }) => ({ id: permissionId })) // ✅ Agrega estos permisos
                    //disconnect: [{ id: 1 }] // ✅ Elimina este permiso si existía
                }
            },
            include: { permission: true }
        });*/

        res.status(200).json({ message: 'Permisos actualizados' });
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

export const deleteRolePermission = async (req: Request, res: Response): Promise<void> => {
    const roleId = parseInt(req.params.id)
    try {
        /* await prisma.delete({
             where: {
                 id: permiId
             }
         })*/
        await prisma.deleteMany({
            where: {
                roleId: roleId
            }
        });

        res.status(200).json({
            message: `El usuario ${roleId} ha sido eliminado`
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