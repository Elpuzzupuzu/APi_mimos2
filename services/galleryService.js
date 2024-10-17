const Gallery = require('../models/Gallery');

exports.getAllimages = async () => {
    return await Gallery.findAll();
};
