const Category = require('../../models/categories.model');

const addNewCategory = async (_, args, context) => {
    if (!context.user_id && context.type !== 'seller' && context.type !== 'admin') {
        return {
            error: true,
            message: 'Admin Login is required'
        }
    }
    try {
        let category = new Category(args.CategoryInput);
        let result = category.save();
        return {
            error: false,
            message: 'Category Created Successfully',
            data: result
        }
    } catch (error) {
        return {
            error: true,
            message: 'Could not create a category'
        }
    }
}

const getAllCategories = async (_, args, context) => {
    if (!context.user_id && !context.type) {
        return {
            error: true,
            message: 'User login required'
        }
    }
    try {
        let categories = await Category.find({});
        if (!categories) {
            return {
                error: true,
                message: 'No categories found'
            }
        }

        return {
            error: false,
            message: 'Categories Found',
            data:categories
        }
    } catch (error) {
        return {
            error: true,
            message: 'Could not retrieve categories'
        }
    }
}

module.exports = {
    addNewCategory,
    getAllCategories
}