import express from 'express';
import { routes } from './routes';

const app = express();
app.use(express.json());
app.use(routes);

// npm run dev
// http://localhost:3333/
app.listen(3333, () => console.log('Servidor iniciado na porta 3333'));
