// ============================================================
// Categories controller
// ============================================================
const { Category, Product } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.list = asyncH(async (req, res) => {
    const include = req.query.withCount === 'true'
        ? [{ model: Product, as: 'products', attributes: [] }]
        : [];
    const rows = await Category.findAll({
        include,
        order: [['label', 'ASC']],
        distinct: true,
    });
    return ok(res, rows);
});

exports.getBySlug = asyncH(async (req, res) => {
    const cat = await Category.findOne({ where: { slug: req.params.slug } });
    if (!cat) throw HttpError.notFound('Category not found');
    return ok(res, cat);
});

exports.create = asyncH(async (req, res) => {
    const { label, slug } = req.body;
    if (!label || !slug) throw HttpError.badRequest('label and slug are required');
    const cat = await Category.create({ label, slug });
    return created(res, cat);
});

exports.update = asyncH(async (req, res) => {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) throw HttpError.notFound('Category not found');
    await cat.update(req.body);
    return ok(res, cat);
});

exports.remove = asyncH(async (req, res) => {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) throw HttpError.notFound('Category not found');
    const used = await Product.count({ where: { categoryId: cat.id } });
    if (used > 0) throw HttpError.conflict(`Category is used by ${used} product(s)`);
    await cat.destroy();
    return noContent(res);
});
