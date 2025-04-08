// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Crea permisos (ejemplo)
    const permisos = await Promise.all([
        prisma.permission.upsert({
            where: { name: 'CREATE_USER' },
            update: {},
            create: { name: 'CREATE_USER' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_USER' },
            update: {},
            create: { name: 'UPDATE_USER' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_USER' },
            update: {},
            create: { name: 'GETALL_USER' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETID_USER' },
            update: {},
            create: { name: 'GETID_USER' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_USER' },
            update: {},
            create: { name: 'DELETE_USER' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_ROL' },
            update: {},
            create: { name: 'CREATE_ROL' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_ROL' },
            update: {},
            create: { name: 'UPDATE_ROL' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_ROL' },
            update: {},
            create: { name: 'GETALL_ROL' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETID_ROL' },
            update: {},
            create: { name: 'GETID_ROL' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_ROL' },
            update: {},
            create: { name: 'DELETE_ROL' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_PERMISSION' },
            update: {},
            create: { name: 'CREATE_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_PERMISSION' },
            update: {},
            create: { name: 'UPDATE_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETID_PERMISSION' },
            update: {},
            create: { name: 'GETID_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_PERMISSION' },
            update: {},
            create: { name: 'GETALL_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_PERMISSION' },
            update: {},
            create: { name: 'DELETE_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_ROL_PERMISSION' },
            update: {},
            create: { name: 'CREATE_ROL_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_ROL_PERMISSION' },
            update: {},
            create: { name: 'UPDATE_ROL_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_ROL_PERMISSION' },
            update: {},
            create: { name: 'GETALL_ROL_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETID_ROL_PERMISSION' },
            update: {},
            create: { name: 'GETID_ROL_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_ROL_PERMISSION' },
            update: {},
            create: { name: 'DELETE_ROL_PERMISSION' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_ALOJA' },
            update: {},
            create: { name: 'CREATE_ALOJA' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_ALOJA' },
            update: {},
            create: { name: 'UPDATE_ALOJA' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_ALOJA' },
            update: {},
            create: { name: 'GETALL_ALOJA' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETID_ALOJA' },
            update: {},
            create: { name: 'GETID_ALOJA' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_ALOJA' },
            update: {},
            create: { name: 'DELETE_ALOJA' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_CLIENTES' },
            update: {},
            create: { name: 'CREATE_CLIENTES' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_CLIENTES' },
            update: {},
            create: { name: 'UPDATE_CLIENTES' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_CLIENTES' },
            update: {},
            create: { name: 'GETALLID_CLIENTES' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_CLIENTES' },
            update: {},
            create: { name: 'GETALL_CLIENTES' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_CLIENTES' },
            update: {},
            create: { name: 'DELETE_CLIENTES' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETIDALOJACLI_CLIENTES' },
            update: {},
            create: { name: 'GETIDALOJACLI_CLIENTES' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETVENTACLI_COMPRAS' },
            update: {},
            create: { name: 'GETVENTACLI_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_COMPRAS' },
            update: {},
            create: { name: 'CREATE_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_COMPRAS' },
            update: {},
            create: { name: 'UPDATE_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_COMPRAS' },
            update: {},
            create: { name: 'GETALL_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_COMPRAS' },
            update: {},
            create: { name: 'GETALLID_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_COMPRAS' },
            update: {},
            create: { name: 'DELETE_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_ENCARGADOS' },
            update: {},
            create: { name: 'CREATE_ENCARGADOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_ENCARGADOS' },
            update: {},
            create: { name: 'UPDATE_ENCARGADOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_ENCARGADOS' },
            update: {},
            create: { name: 'GETALL_ENCARGADOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_ENCARGADOS' },
            update: {},
            create: { name: 'GETALLID_ENCARGADOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLENCARGADOUSER_ENCARGADOS' },
            update: {},
            create: { name: 'GETALLENCARGADOUSER_ENCARGADOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_ENCARGADOS' },
            update: {},
            create: { name: 'DELETE_ENCARGADOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_ENTRADAS' },
            update: {},
            create: { name: 'CREATE_ENTRADAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_ENTRADAS' },
            update: {},
            create: { name: 'UPDATE_ENTRADAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_ENTRADAS' },
            update: {},
            create: { name: 'GETALL_ENTRADAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_ENTRADAS' },
            update: {},
            create: { name: 'GETALLID_ENTRADAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_ENTRADAS' },
            update: {},
            create: { name: 'DELETE_ENTRADAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_HABITACIONES' },
            update: {},
            create: { name: 'CREATE_HABITACIONES' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_HABITACIONES' },
            update: {},
            create: { name: 'UPDATE_HABITACIONES' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_HABITACIONES' },
            update: {},
            create: { name: 'GETALL_HABITACIONES' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_HABITACIONES' },
            update: {},
            create: { name: 'GETALLID_HABITACIONES' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_HABITACIONES' },
            update: {},
            create: { name: 'DELETE_HABITACIONES' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLHABUSER_HABITACIONES' },
            update: {},
            create: { name: 'GETALLHABUSER_HABITACIONES' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_INVENTARIOS' },
            update: {},
            create: { name: 'CREATE_INVENTARIOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_INVENTARIOS' },
            update: {},
            create: { name: 'UPDATE_INVENTARIOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_INVENTARIOS' },
            update: {},
            create: { name: 'GETALL_INVENTARIOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_INVENTARIOS' },
            update: {},
            create: { name: 'GETALLID_INVENTARIOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_INVENTARIOS' },
            update: {},
            create: { name: 'DELETE_INVENTARIOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_PROD_COMPRAS' },
            update: {},
            create: { name: 'CREATE_PROD_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_PROD_COMPRAS' },
            update: {},
            create: { name: 'UPDATE_PROD_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_PROD_COMPRAS' },
            update: {},
            create: { name: 'GETALL_PROD_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_PROD_COMPRAS' },
            update: {},
            create: { name: 'GETALLID_PROD_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_PROD_COMPRAS' },
            update: {},
            create: { name: 'DELETE_PROD_COMPRAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_PROD_INVETARIO' },
            update: {},
            create: { name: 'CREATE_PROD_INVETARIO' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_PROD_INVETARIO' },
            update: {},
            create: { name: 'UPDATE_PROD_INVETARIO' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_PROD_INVETARIO' },
            update: {},
            create: { name: 'GETALL_PROD_INVETARIO' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_PROD_INVETARIO' },
            update: {},
            create: { name: 'GETALLID_PROD_INVETARIO' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_PROD_INVETARIO' },
            update: {},
            create: { name: 'DELETE_PROD_INVETARIO' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_PRODUCTOS' },
            update: {},
            create: { name: 'CREATE_PRODUCTOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_PRODUCTOS' },
            update: {},
            create: { name: 'UPDATE_PRODUCTOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_PRODUCTOS' },
            update: {},
            create: { name: 'GETALL_PRODUCTOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_PRODUCTOS' },
            update: {},
            create: { name: 'GETALLID_PRODUCTOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLPRODUCINVEN_PRODUCTOS' },
            update: {},
            create: { name: 'GETALLPRODUCINVEN_PRODUCTOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_PRODUCTOS' },
            update: {},
            create: { name: 'DELETE_PRODUCTOS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_PROD_VENTAS' },
            update: {},
            create: { name: 'CREATE_PROD_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_PROD_VENTAS' },
            update: {},
            create: { name: 'UPDATE_PROD_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_PROD_VENTAS' },
            update: {},
            create: { name: 'GETALL_PROD_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_PROD_VENTAS' },
            update: {},
            create: { name: 'GETALLID_PROD_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_PROD_VENTAS' },
            update: {},
            create: { name: 'DELETE_PROD_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_RESERVACION' },
            update: {},
            create: { name: 'CREATE_RESERVACION' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_RESERVACION' },
            update: {},
            create: { name: 'UPDATE_RESERVACION' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_RESERVACION' },
            update: {},
            create: { name: 'GETALL_RESERVACION' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_RESERVACION' },
            update: {},
            create: { name: 'GETALLID_RESERVACION' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_RESERVACION' },
            update: {},
            create: { name: 'DELETE_RESERVACION' },
        }),
        prisma.permission.upsert({
            where: { name: 'GENERATEPDF_RESERVACION' },
            update: {},
            create: { name: 'GENERATEPDF_RESERVACION' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_SALIDAS' },
            update: {},
            create: { name: 'CREATE_SALIDAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_SALIDAS' },
            update: {},
            create: { name: 'UPDATE_SALIDAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_SALIDAS' },
            update: {},
            create: { name: 'GETALL_SALIDAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_SALIDAS' },
            update: {},
            create: { name: 'GETALLID_SALIDAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_SALIDAS' },
            update: {},
            create: { name: 'DELETE_SALIDAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'CREATE_VENTAS' },
            update: {},
            create: { name: 'CREATE_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'UPDATE_VENTAS' },
            update: {},
            create: { name: 'UPDATE_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALL_VENTAS' },
            update: {},
            create: { name: 'GETALL_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETALLID_VENTAS' },
            update: {},
            create: { name: 'GETALLID_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'DELETE_VENTAS' },
            update: {},
            create: { name: 'DELETE_VENTAS' },
        }),
        prisma.permission.upsert({
            where: { name: 'GETVENTACLIENTE_VENTAS' },
            update: {},
            create: { name: 'GETVENTACLIENTE_VENTAS' },
        }),
        // Agrega más permisos según sea necesario...
    ]);

    // Crea rol de administrador y asigna todos los permisos
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
            // Relación con la tabla intermedia
            permissions: {
                create: permisos.map((perm) => ({
                    permission: { connect: { id: perm.id } },
                })),
            },
        },
    });

    // Encripta la contraseña del admin
    const hashedPassword = await bcrypt.hash('password', 10);

    // Crea el usuario administrador
    await prisma.users.upsert({
        where: { email: 'firrewall2000@gmail.com' },
        update: {},
        create: {
            email: 'firrewall2000@gmail.com',
            password: hashedPassword,
            roleId: adminRole.id, // Asigna el rol de admin
            created_at: new Date().toISOString(),
        },
    });

    console.log('Datos iniciales insertados correctamente.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
