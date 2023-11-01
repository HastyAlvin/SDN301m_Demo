import express from 'express';
import categoryController from '../controllers/category.controller.js';

const categoryRouter = express.Router();

categoryRouter.post('/category', categoryController.create);

export default categoryRouter;