const galleryService = require('../services/galleryService');

exports.getAllimages = async (req, res) => {
    try {
        const images = await galleryService.getAllimages();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




