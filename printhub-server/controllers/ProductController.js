const { Product } = require('../models');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { catalog_id, name, customization_options } = req.body;
        const product = await Product.create({
            catalog_id,
            name,
            customization_options,
        });
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId, {
            include: ['Catalog'], // Include related Catalog model if needed
        });
        if (product) {
            res.status(200).json({ product });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const { name, customization_options } = req.body;
        const [updated] = await Product.update({ name, customization_options }, { where: { id: productId } });
        if (updated) {
            const updatedProduct = await Product.findByPk(productId);
            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deleted = await Product.destroy({ where: { id: productId } });
        if (deleted) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
