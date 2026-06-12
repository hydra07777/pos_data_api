// ============================================================
// ProductSize controller
// ============================================================
const { ProductSize, Product } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.listForProduct = asyncH(async (req, res) => {
    const sizes = await ProductSize.findAll({
        where: { productId: req.params.productId },
        order: [['label', 'ASC']],
    });
    return ok(res, sizes);
});

exports.create = asyncH(async (req, res) => {
    const { productId } = req.params;
    const { label, priceExtra = 0 } = req.body;
    if (!label) throw HttpError.badRequest('label is required');
    const product = await Product.findByPk(productId);
    if (!product) throw HttpError.notFound('Product not found');
    const size = await ProductSize.create({ productId, label, priceExtra });
    return created(res, size);
});

exports.remove = asyncH(async (req, res) => {
    const size = await ProductSize.findByPk(req.params.id);
    if (!size) throw HttpError.notFound('Size not found');
    await size.destroy();
    return noContent(res);
});
