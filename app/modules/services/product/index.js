const Validator = require('../../../helpers/validateSchema');
const { ProductSchema } = require('../../schemas');
const { ProductRepository, StockRepository } = require('../../repositories');
const {
    UnprocessableEntityError,
    NotFoundError,
    ApplicationError
} = require('../../../helpers/exceptions');

module.exports = {
    createProduct: async (payload) => {
        const dataProduct = await Validator.validateSchema(payload, ProductSchema.POST);
        const isExist = await ProductRepository.getBy({ name: payload.name });
        if (isExist && isExist.length > 0) {
            throw new UnprocessableEntityError('Product is already exist!');
        }

        const add = await ProductRepository.save(dataProduct);
        if (!add) {
            throw new ApplicationError('Something went wrong, please try again!');
        }

        await StockRepository.save({ idProduct: add.id });
        return add;
    },
    getProductById: async (id) => {
        const product = await ProductRepository.getOne({ id: id });
        if (!product) {
            throw new NotFoundError('Product is not found!');
        }
        return product;
    },
    updateProduct: async (id, payload) => {
        const dataProduct = await Validator.validateSchema(payload, ProductSchema.PUT);
        const isExist = await ProductRepository.getById(id);
        if (!isExist) {
            throw new NotFoundError('Product not found!');
        }

        return await ProductRepository.update(dataProduct, id);
    },
    getProducts: async () => {
        const types = await ProductRepository.getAll();
        if (types && types.length === 0) {
            throw new NotFoundError('Product not found!');
        }
        return types;
    },
    remove: async (id) => {
        const remove = await ProductRepository.remove(id);
        if (remove) {
            await StockRepository.removeBy({ idProduct: id });
        }

        return remove;
    }
};
