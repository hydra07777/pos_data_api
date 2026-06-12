// ============================================================
// Auth middlewares
// ------------------------------------------------------------
// The /api/cashiers/login endpoint issues a simple opaque token
// of the form `static-token-<cashierId>` (see cashiers.controller).
// This module parses that token, loads the matching cashier, and
// exposes a few middlewares:
//   - attachCashierIfPresent : soft, never blocks the request
//   - requireAuth            : hard 401 if not authenticated
//   - requireRole(...roles)  : hard 403 if role is not allowed
// ============================================================
const { Cashier } = require('../models');
const HttpError = require('../utils/httpError');

const STATIC_TOKEN_PREFIX = 'static-token-';
const BEARER_RE = /^Bearer\s+(.+)$/i;

/**
 * Extracts the raw token string from the Authorization header.
 * Returns null when no Bearer token is present.
 */
function extractToken(req) {
    const header = req.headers && req.headers.authorization;
    if (!header) return null;
    const match = BEARER_RE.exec(header);
    return match ? match[1].trim() : null;
}

/**
 * Parses a token and returns the cashierId it refers to, or null
 * if the token is not a recognised static token.
 */
function parseStaticTokenId(token) {
    if (!token || typeof token !== 'string') return null;
    if (!token.startsWith(STATIC_TOKEN_PREFIX)) return null;
    const id = parseInt(token.slice(STATIC_TOKEN_PREFIX.length), 10);
    return Number.isFinite(id) && id > 0 ? id : null;
}

/**
 * Soft middleware — if a valid token is present, attaches the
 * cashier to `req.cashier` and the id to `req.cashierId`.
 * Never throws, never blocks the request (used globally in app.js).
 */
async function attachCashierIfPresent(req, _res, next) {
    try {
        const token = extractToken(req);
        const id = parseStaticTokenId(token);
        if (!id) return next();

        const cashier = await Cashier.findByPk(id);
        if (cashier && cashier.isActive) {
            req.cashier = cashier;
            req.cashierId = cashier.id;
        }
        return next();
    } catch (err) {
        // Soft middleware — swallow errors so unauthenticated flows
        // (health-check, public reads, etc.) keep working.
        return next();
    }
}

/**
 * Hard middleware — requires a valid, active cashier to be
 * attached. Use after `attachCashierIfPresent`.
 */
function requireAuth(req, _res, next) {
    if (req.cashier && req.cashier.isActive) return next();
    return next(HttpError.unauthorized('Authentication required'));
}

/**
 * Role guard — must be chained after `requireAuth`.
 * Example: router.post('/admin', requireAuth, requireRole('admin', 'manager'), handler)
 */
function requireRole(...allowed) {
    const roles = allowed.flat().filter(Boolean);
    return (req, _res, next) => {
        if (!req.cashier) return next(HttpError.unauthorized('Authentication required'));
        if (roles.length && !roles.includes(req.cashier.role)) {
            return next(HttpError.forbidden(`Role '${req.cashier.role}' is not allowed`));
        }
        return next();
    };
}

/**
 * Helper used by the login controller — keeps the token format
 * in a single place so the middleware can stay in sync.
 */
function buildStaticToken(cashier) {
    if (!cashier || !cashier.id) throw HttpError.internal('Cannot build token without a cashier');
    return `${STATIC_TOKEN_PREFIX}${cashier.id}`;
}

module.exports = {
    attachCashierIfPresent,
    requireAuth,
    requireRole,
    buildStaticToken,
    // exposed for unit tests
    _internal: { extractToken, parseStaticTokenId, STATIC_TOKEN_PREFIX },
};
