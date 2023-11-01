import express from 'express';
import controllers from '../controllers/index.js';

const productRouter = express.Router();
productRouter.post('/', controllers.productController.create);
productRouter.get('/', controllers.productController.getAll);
productRouter.post('/product/:id/comment', controllers.productController.addComment);
productRouter.get('/product/:id/comments', controllers.productController.getAllComment);
productRouter.get('/product/:id', controllers.productController.getProductById);

export default productRouter;