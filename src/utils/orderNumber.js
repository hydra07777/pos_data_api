// ============================================================
// Generate a human-readable order number : ORD-10291
// ============================================================
const generate = async (OrderModel) => {
    const last = await OrderModel.findOne({ order: [['id', 'DESC']] });
    const next = last ? last.id + 1 : 1;
    return `ORD-${10000 + next}`;
};

module.exports = { generate };
