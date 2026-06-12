// ============================================================
// 404 handler — must be mounted last
// ============================================================
module.exports = (_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
};
