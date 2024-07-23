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
import productoVentas from './routes/productoVentasRoutes'
const app = express();

app.use(express.json())

//Routes
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/alojamientos', alojamientosRoutes)
app.use('/compras', comprasRoutes)
app.use('/encargados', encargadosRoutes)
app.use('/habitaciones', habitacionesRoutes)
app.use('/inventarios', inventariosRoutes)
app.use('/productos', productosRoutes)
app.use('/productoCompras', productoCompras)
app.use('/productoInventarios', productoInventarios)
app.use('/recervaciones', recervaciones)
app.use('/ventas', ventas)
app.use('/productoVentas', productoVentas)

//Hacer una api rest de usuarios


console.log("Esto esta siendo ejecutado");
 
export default app