import { Router } from 'express';
import { ProductController } from "./controllers/ProductController";

const routes = Router();
const path = '/store';

const prontuarioController = new ProductController();

routes.get(`${path}/products`, prontuarioController.getAll);
routes.get(`${path}/products/:id`, prontuarioController.getById);
routes.post(`${path}/products`, prontuarioController.create);
routes.put(`${path}/products/:id`, prontuarioController.verifyIfExists, prontuarioController.update);
routes.delete(`${path}/products/:id`, prontuarioController.verifyIfExists, prontuarioController.delete);

export { routes };
