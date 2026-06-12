// ============================================================
// Custom error class — thrown by controllers and caught by the
// global error middleware.
// ============================================================
class HttpError extends Error {
    constructor(status, message, details) {
        super(message);
        this.status = status;
        this.details = details;
    }

    static badRequest(message, details) { return new HttpError(400, message, details); }
    static unauthorized(message = 'Unauthorized') { return new HttpError(401, message); }
    static forbidden(message = 'Forbidden') { return new HttpError(403, message); }
    static notFound(message = 'Not found') { return new HttpError(404, message); }
    static conflict(message, details) { return new HttpError(409, message, details); }
    static internal(message = 'Internal server error') { return new HttpError(500, message); }
}

module.exports = HttpError;
