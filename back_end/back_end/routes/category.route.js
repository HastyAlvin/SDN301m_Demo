import express from 'express';
import categoryController from '../controllers/category.controller.js';
const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.create);
categoryRouter.get('/', categoryController.getAll);

export default categoryRouter;