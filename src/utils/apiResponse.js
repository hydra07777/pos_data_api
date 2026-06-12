// ============================================================
// Tiny helpers to build consistent JSON responses
// ============================================================
exports.ok = (res, data, message) =>
    res.status(200).json({ success: true, message: message || 'OK', data });

exports.created = (res, data, message) =>
    res.status(201).json({ success: true, message: message || 'Created', data });

exports.noContent = (res) => res.status(204).send();

exports.paginated = (res, { rows, count }, page, limit) =>
    res.status(200).json({
        success: true,
        data: rows,
        meta: {
            total: count,
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || rows.length,
            totalPages: Math.ceil(count / (parseInt(limit, 10) || rows.length || 1)),
        },
    });
