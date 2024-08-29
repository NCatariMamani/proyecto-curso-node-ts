import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/userRoutes';
import alojamientosRoutes from './routes/alojamientosRoutes';
import comprasRoutes from './routes/comprasRoutes';
import encargadosRoutes from './routes/encargadosRoutes';;
import habitacionesRoutes from './routes/habitacionesRoutes';
import inventariosRoutes from './routes/inventariosRoutes';
import productosRoutes from './routes/productosRoutes';
import productoCompras from './routes/productoComprasRoutes';
import productoInventarios from './routes/productoInventariosRoutes';
import recervaciones from './routes/recervacionesRoutes';
import ventas from './routes/ventasRoutes';
import productoVentas from './routes/productoVentasRoutes';

import entradas from './routes/entradasRoutes';
import salidas from './routes/salidasRoutes';

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

//Routes
app.use('/auth', authRoutes)
app.use('/catalog/users', usersRoutes)
app.use('/catalog/alojamientos', alojamientosRoutes)
app.use('/catalog/compras', comprasRoutes)
app.use('/catalog/encargados', encargadosRoutes)
app.use('/catalog/habitaciones', habitacionesRoutes)
app.use('/catalog/inventarios', inventariosRoutes)
app.use('/catalog/productos', productosRoutes)
app.use('/catalog/productoCompras', productoCompras)
app.use('/catalog/productoInventarios', productoInventarios)
app.use('/catalog/recervaciones', recervaciones)
app.use('/catalog/ventas', ventas)
app.use('/catalog/productoVentas', productoVentas)
app.use('/catalog/entradas', entradas)
app.use('/catalog/salidas', salidas)


//Hacer una api rest de usuarios


console.log("Esto esta siendo ejecutado");
 
export default app