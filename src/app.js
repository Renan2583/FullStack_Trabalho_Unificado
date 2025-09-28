import 'dotenv/config';
import express from 'express';
import clienteRoutes from './routes/clienteroutes.js';
import servicoRoutes from './routes/servicosroute.js';
import carroRoutes from './routes/carroroute.js';
import ordemRoutes from './routes/ordemroute.js';


const app = express();
app.use(express.json());

app.use('/clientes',clienteRoutes);
app.use('/servicos',servicoRoutes);
app.use('/carros',carroRoutes);
app.use('/ordens',ordemRoutes);



export default app;

