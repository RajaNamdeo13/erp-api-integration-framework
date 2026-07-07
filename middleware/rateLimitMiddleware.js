const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 120;
const buckets = new Map();

function rateLimitMiddleware(req, res, next) {
  const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  res.setHeader("x-rate-limit-limit", MAX_REQUESTS);
  res.setHeader("x-rate-limit-remaining", Math.max(MAX_REQUESTS - bucket.count, 0));

  if (bucket.count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please retry later.",
      requestId: req.requestId,
    });
  }

  next();
}

module.exports = rateLimitMiddleware;
