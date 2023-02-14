const Product = require('../../models/product.model');
const User = require('../../models/user.model')
const Shop = require('../../models/shop.model');
const { default: mongoose } = require('mongoose');

const addNewProduct = async (_, args, context) => {
    if (!context.user_id && !context.type == 'seller') {
        return {
            error: true,
            message: "Seller Login Required"
        }
    }
    try {

        let isExists = await Product.find({ name: args.NewProduct.name });
        if (isExists.length > 0) {
            return {
                error: true,
                message: 'Item with same name already exists'
            }
        }
        let product = new Product(args.NewProduct);
        let result = await product.save();
        return {
            error: false,
            message: 'Product Successfuly created',
            data: result

        }

    } catch (error) {
        return {
            error: true,
            message: "Could not create a product"
        }
    }
}

const getAllProductsByShop = async (_, args, context) => {
    if (!context.user_id && !context.type == 'seller') {
        return {
            error: true,
            message: 'Seller login required'
        }
    }
    try {

        let shopData = await Shop.findOne({ _id: args._id }).populate('owner', '_id name');

        if (shopData.owner._id.toString() !== context.user_id) {
            return {
                error: true,
                message: 'User not authorized'
            }
        }
        let allproducts = await Product.find({ shop: args._id }).populate('owner', '_id name').populate('shop', '_id name');

        if (allproducts.length > 0) {
            return {
                error: false,
                message: 'Products retrieving successful',
                data: allproducts
            }
        }
        return {
            error: true,
            message: 'No Products found'
        }

    } catch (error) {
        return {
            error: true,
            message: error
        }
    }
}

const updateProductByID = async (_, args, context) => {
    if (!context.user_id && !context.type == 'seller') {
        return {
            error: true,
            message: 'Login is required'
        }
    }
    try {

        args.productInput.updated = Date.now();
        let product = await Product.findByIdAndUpdate({ _id: args.productInput._id }, args.productInput, { new: true }).populate('owner', '_id name').populate('shop', '_id name')
        let result = product.save();
        if (!product) {
            return {
                error: true,
                message: 'No Product found'
            }
        }

        return {
            error: false,
            message: 'Product Updated Successfully',
            data: result
        }

    } catch (error) {
        return {
            error: true,
            message: "Cannot update the product"
        }
    }
}

const deleteProductByID = async (_, args, context) => {
    if (!context.user_id && !context.type == 'seller') {
        return {
            error: true,
            message: 'Seller Login required'
        }
    }
    try {

        let result = await Product.findByIdAndDelete(args._id);
        if (!result) {
            return {
                error: true,
                message: 'No product to delete'
            }
        }

        return {
            error: false,
            message: 'Product Deleted Successfully',
            data: result
        }

    } catch (error) {
        return {
            error: true,
            message: 'Cannot delete the product'
        }
    }
}

const getCategories = async (_, args, context) => {
    if (!context.user_id && !context.type) {
        return {
            error: true,
            message: 'Login is required'
        }
    }
    try {
        let categories = await Product.distinct('category', {});

        return {
            error: false,
            message: 'Categories successfully retrieved',
            data: categories
        }
    } catch (error) {

        return {
            error: true,
            message: 'Could not list categories'
        }
    }
}

const updateProductStatus = async (_, args, context) => {
    if (!context.user_id && !context.type == 'seller') {
        return {
            error: true,
            message: 'Seller Login required'
        }
    }
    try {

        let result = await Product.findByIdAndUpdate({ _id: args._id }, { active: args.active }, { new: true });
        if (!result) {
            return {
                error: true,
                message: 'Unable to update the product'
            }
        }
        return {
            error: false,
            message: 'Product Updated Successfully',
            data: result
        }
    } catch (error) {

        return {
            error: true,
            message: 'Could not update products'
        }
    }
}

const getAllProducts = async (_, args, context) => {
    if (!context.user_id && !context.type) {
        return {
            error: true,
            message: 'User login required'
        }
    }
    try {

        let products = await Product.find({ active: true }).populate('owner', '_id name').populate('shop', '_id name').sort('-created');
        if (!products.length > 0) {
            return {
                error: true,
                message: 'No products found'
            }
        }

        return {
            error: false,
            message: 'Products retrieved successfully',
            data: products
        }

    } catch (error) {
        return {
            error: true,
            message: 'Could not retrieve Products'
        }
    }
}

const getProductByID = async (_, args, context) => {
    if (!context.user_id && !context.type) {
        return {
            error: true,
            message: "Login is required"
        }
    }
    try {

        let productDetails = await Product.findById(args._id).populate('shop','name');
        if (!productDetails) {
            return {
                error: true,
                message: 'No product found'
            }
        }
        return {
            error: false,
            message: 'Product retrieved successfully',
            data: productDetails
        }


    } catch (error) {
        return {
            error: true,
            message: 'Could not retrieve the product'
        }
    }
}

const getProductsByPrice = async (_, args, context) => {
    try {

        let query = {};
        if (args.low || args.high) {
            query = {
                sellingprice: {
                    $gte: args.low ? args.low : 0,
                    $lte: args.high ? args.high : Number.MAX_VALUE
                }
            }
        }

        let sortquery = {};

        if (args.sort == 'newest') {
            sortquery = {
                'created': -1
            }
        } else {
            sortquery = {
                'created': 1
            }
        }

        let products = await Product.aggregate([
            {
                $match: query,

            },
            {
                $sort:sortquery
            }
        ])


        if (!products) {
            return {
                error: true,
                message: 'Could not find any products'
            }
        }

        return {
            error: false,
            message: 'Products found',
            data: products
        }

    } catch (error) {
        return {
            error: true,
            message: 'Could not find any products'
        }
    }
}
const addProductReviewAndRating= async (_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User login required'
        }
    }
    try {
        
        let productReview = {
            title:args.RatingReview.title,
            description:args.RatingReview.description,
            userID:args.RatingReview.userID,
            rating:args.RatingReview.ratings

        }


        
        let product= await Product.findByIdAndUpdate(args.RatingReview._id, {$inc: {[`ratings.${args.RatingReview.ratings}`]: 1},$push:{review:productReview}}, {new: true})
       
        // console.log(product);
      
        // let finalProductResult = await Product.findByIdAndUpdate({_id:args._id},{$inc:{'ratings.rating_count':1},$set:{'ratings.rating':Ratings} },{ new:true})
        return {
            error:false,
            message:'Successfully added a review',
            data:product
        }


    } catch (error) {
        console.log(error)
        return {
            error:true,
            message:'Could not add a review and rating'
        }
    }
}

module.exports = {
    getProductByID,
    addNewProduct
    , getAllProductsByShop,
    updateProductByID,
    deleteProductByID,
    getCategories,
    updateProductStatus,
    getAllProducts,
    getProductsByPrice,
    addProductReviewAndRating
};