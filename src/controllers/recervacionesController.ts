import { Request, Response } from 'express';
import { hashPasword } from '../services/password.service';
import prisma from '../models/recervacion';
import { PrismaClient } from '@prisma/client';

//import { Pool } from 'pg';
//import { PDFDocument } from 'pdfkit';
//import 'pdfkit-table';

//const express = require('express');
//const fs = require('fs');
const PDFDocument = require('pdfkit-table');
const moment = require('moment');
const path = require('path');


export const createRecervacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { clienteId, fecha, horaEntrada, horaSalida, horaProgramada, tiempo, compania, costoHabitacion, costoExtra, total, habitacionId, encargadoId, alojamientoId, totalVenta, cambio, estadoCambio, montoEntregado } = req.body;
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

        const recervacion = await prisma.create({
            data: {
                fecha, horaEntrada, horaSalida, horaProgramada, tiempo, compania, costoHabitacion, costoExtra, total, habitacionId, encargadoId, alojamientoId, totalVenta, cambio, estadoCambio, montoEntregado, clienteId, created_at: new Date().toISOString(), updated_at: varnull
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
        const recervaciones = await prisma.findMany({
            skip: skip,
            take: limit,
            where,
            orderBy: {
                created_at: 'desc'
            }, include: {
                ventas: true,
                habitaciones: true,
                encargados: true,
                alojamientos: true,
                clientes: true // Incluye los detalles del alojamiento
            }
        });
        const totalRecords = await prisma.count({ where });
        res.status(200).json({
            statusCode: 200,
            message: "Registros encontrados",
            data: recervaciones,
            count: totalRecords
        })
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
    const { clienteId, fecha, horaEntrada, horaSalida, horaProgramada, tiempo, compania, costoHabitacion, costoExtra, total, habitacionId, encargadoId, totalVenta, cambio, estadoCambio, montoEntregado } = req.body;
    try {
        let dataToUpdate: any = { ...req.body }
        if (fecha) {
            dataToUpdate.fecha = fecha
        }
        if (horaEntrada) {
            dataToUpdate.horaEntrada = horaEntrada
        }
        if (horaSalida) {
            dataToUpdate.horaSalida = horaSalida
        }
        if (horaProgramada) {
            dataToUpdate.horaSalida = horaProgramada
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
        if (clienteId) {
            dataToUpdate.clienteId = clienteId
        }
        if (totalVenta) {
            dataToUpdate.totalVenta = totalVenta
        }
        if (cambio) {
            dataToUpdate.cambio = cambio
        }
        if (estadoCambio) {
            dataToUpdate.estadoCambio = estadoCambio
        }
        if (montoEntregado) {
            dataToUpdate.montoEntregado = montoEntregado
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
        } else if (error?.code === 'P2003') {
            res.status(409).json({ error: 'No se puede completar la operación debido a una restricción de clave externa.' })
            return
        } else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
            return
        }
    }
}


export const generatePDF = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fechaIni, fechaFin, idAloja } = req.body;
        const reservaciones = await prisma.findMany({
            where: {
                alojamientoId: idAloja,
                fecha: {
                    gte: fechaIni,
                    lte: fechaFin
                }
            },
            orderBy: {
                id: 'desc'
            },
            include: {
                clientes: true,
                alojamientos: true,
                encargados: true
            }
        });

        // Transformamos los datos para adaptarlos a la tabla del PDF
        const data = reservaciones.map((reserva: any) => ({
            id: reserva.id,
            cliente: `${reserva.clientes.nombre} ${reserva.clientes.paterno} ${reserva.clientes.materno} ${reserva.clientes.ci} ${reserva.clientes.extencion}`,
            horaEntrada: reserva.horaEntrada,  // Asumiendo que es un string o se formatea según se requiera
            horaSalida: reserva.horaSalida ? reserva.horaSalida : '',
            fecha: convertDate(reserva.fecha), // Formateamos la fecha como YYYY-MM-DD
            alojamiento: reserva.alojamientos.nombre,
            total: convertirABsNumero(reserva.total, reserva.costoExtra)
        }));

        const sumaTotal = data.reduce((acumulado, reserva) => {
            const totalConvertido = parseFloat(reserva.total.replace(' Bs', '').replace(',', '.')) || 0;
            return acumulado + totalConvertido;
          }, 0);

        const doc = new PDFDocument({
            size: 'LETTER', // legal = oficio
            layout: 'landscape',
            margins: {
                top: 50,
                bottom: 30,
                left: 50,
                right: 50
            }
        });
        const fileName = 'RESERVAS.pdf';
        const filePath = `${__dirname}/${fileName}`;

        const configuracion = {
            encabezado: {
                texto: data[0].alojamiento,
                tipoLetra: 'Helvetica-Bold',
                tamanoLetra: 16,
            },
            piePagina: {
                texto: 'Pie de página del PDF',
                tipoLetra: 'Helvetica',
                tamanoLetra: 10,
            },
            contenido: `La sumatoria del rango seleccionado es ${sumaTotal.toFixed(2).replace('.', ',') + ' Bs'}`,
        };

        const fechaHora = moment().format('hh:mm A DD/MM/YYYY'); // Formato HH:mm am/pm día/mes/año
        const titulo = configuracion.encabezado.texto;
        const imagenPath = path.join(__dirname, '../public/images/login3.png');

        doc.image(imagenPath, 40, 20, {
            width: 50, // Ancho de la imagen
            height: 50, // Alto de la imagen (ajusta según tu necesidad)
        });
        // Título centrado
        doc.font(configuracion.encabezado.tipoLetra)
            .fontSize(configuracion.encabezado.tamanoLetra)
            .text(titulo, 0, 30, {
                align: 'center',
                width: doc.page.width
            });
        // Fecha y hora alineada a la derecha
        doc.font(configuracion.encabezado.tipoLetra)
            .fontSize(10)
            .text(fechaHora, 0, 30, {
                align: 'right',
                width: doc.page.width - 40 // Ajuste para alinear bien a la derecha
            });
        // Guardar el PDF en el servidor temporalmente
        /*const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);*/
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        doc.moveDown(4);

        console.log(data);

        const tabla = {
            headers: [
                { label: 'Id', property: 'id', width: 50, renderer: (value: any) => value ?? '' },
                { label: 'Cliente', property: 'cliente', width: 150, renderer: (value: any) => value ?? '' },
                { label: 'Hora Entrada', property: 'horaEntrada', width: 90, renderer: (value: any) => value ?? '' },
                { label: 'Hora Salida', property: 'horaSalida', width: 90, renderer: (value: any) => value ?? '' },
                { label: 'Fecha', property: 'fecha', width: 100, renderer: (value: any) => value ?? '' },
                { label: 'Hospedaje', property: 'alojamiento', width: 130, renderer: (value: any) => value ?? '' },
                { label: 'Total', property: 'total', width: 80, renderer: (value: any) => value ?? '' }
            ],
            datas: data,
            options: {
                width: 400,
                align: 'center',
                borderWidth: 1
            }
        };



        doc.table(tabla, {
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
            prepareRow: (row: any, i: number) => doc.font('Helvetica').fontSize(12)
        });

        /* const table = {
          headers: ['ID', 'Nombre', 'Edad'],
          rows: [
            [1, 'Juan', 25],
            [2, 'María', 30],
            [3, 'Pedro', 28],
          ]
        };
      
        // Generamos la tabla
        doc.table(table);*/

        // Contenido
        doc.font('Helvetica')
            .fontSize(12)
            .text(configuracion.contenido, {
                align: 'justify',
            });

        doc.moveDown(2);

        // Pie de página
        const numeroPaginas = doc.bufferedPageRange().count;

        for (let i = 0; i < numeroPaginas; i++) {
            doc.switchToPage(i);
            doc.font('Helvetica')
                .fontSize(10)
                .text(`Página ${i + 1} de ${numeroPaginas}`, 500, 550, {
                    align: 'right'
                });
        }

        doc.end();

        // Enviar el archivo como respuesta cuando termine de escribirlo
        /*stream.on('finish', () => {
            res.download(filePath, fileName, (err) => {
                if (err) {
                    console.error('Error al enviar el archivo:', err);
                }
                // Verificar si el archivo existe antes de eliminarlo
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                } else {
                    console.error('Archivo no encontrado:', filePath);
                }
            });
        });*/

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }

}

function convertirABsNumero(valor: string, valor1: string) {
    // Remover 'Bs' y espacios, luego reemplazar coma por punto y convertir a númer
    let resultado = null;
    if (valor && valor1) {
        const val1 = parseFloat(valor.replace(' Bs', '').replace(',', '.'));
        const val2 = parseFloat(valor1.replace(' Bs', '').replace(',', '.'));

        const suma = val1 + val2;

        // Formatear el resultado de vuelta a 'Bs' con coma
        resultado = suma.toFixed(2).replace('.', ',') + ' Bs';
    } else if (valor) {
        resultado = valor;
    } else {
        resultado = valor1;
    }
    return resultado;
}

function convertDate(date: Date) {
    const fechaISO = date.toISOString().split('T')[0];
    // Convertir a formato día/mes/año
    const [año, mes, dia] = fechaISO.split('-');
    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada;
}

