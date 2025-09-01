/**
 * Wrap async route handlers to forward errors to express error handler
 */
export default function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
