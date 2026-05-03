import ApiError from "../utils/apiError.js";

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return next(new ApiError("Not authenticated", 401));

    if (!roles.includes(req.user.role)) {
      return next(new ApiError("You do not have permission to perform this action", 403));
    }

    next();
  }
}

export default authorizeRoles;
