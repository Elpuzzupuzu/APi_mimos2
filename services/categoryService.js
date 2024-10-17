const Category = require('../models/Category');

exports.getAllCategories = async () => {
    return await Category.findAll();
};

exports.createCategory = async (data) => {
    return await Category.create(data);
};
