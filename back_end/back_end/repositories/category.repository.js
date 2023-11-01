import Category from '../models/category.model.js';

const categoryRepository = {
    create: async ({ name, description }) => {
        try {
            const category = await Category.create({ name, description });
            return category;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getAll: async () => {
        try {
            const categories = await Category.find();
            return categories;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

export default categoryRepository;
