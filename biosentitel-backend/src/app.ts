import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import zonaRoutes from './routes/zonaRoutes';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', zonaRoutes);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});