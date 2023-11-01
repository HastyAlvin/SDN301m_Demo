import repositories from "../repositories/index.js";

const productController = {
    create: async (req, res) => {
        try {
            const {name, price, image, category} = req.body;
            const product = await repositories.productRepository.create(req.body);
            res.status(200).send({
                product,
                message: "Product created successfully"
            });
        } catch (err) {
            res.status(400).send({ message: 'Product created Fail' });
        }
    },
    getAll: async (req, res) => {
        try {
            const products = await repositories.productRepository.getAll();
            res.status(200).send(products);
        } catch (err) {
            res.status(404).send({ message: 'Not found' });
        }
    },
    addComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { user, text, content } = req.body;
            await repositories.productRepository.addComment(id, user, text, content);
            res.status(200).send({
                message: "Comment created successfully"
            });
        } catch (err) {
            res.status(400).send({ message: 'Comment created Fail' });
        }
    },
    getAllComment: async (req, res) => {  
        try {
            const { id } = req.params;
            const comments = await repositories.productRepository.getAllCommentById(id);
            res.status(200).send(comments);
        } catch (error) {
            res.status(404).send({ message: 'Comment not found' });
        }      
    },

    getProductById: async (req, res) => {
        try {
          const {id} = req.params;
          const product = await repositories.productRepository.getProductById(id);
          res.status(200).send(product);
        } catch (error) {
          throw new Error('Unable to get the product by ID');
        }
    }

};
export default productController;