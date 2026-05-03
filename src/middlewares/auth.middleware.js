import jwt from 'jsonwebtoken';

import catchAsync from "./catchAsync.middleware.js";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";

const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.ems_access_token;
  if (!token) return next(new ApiError('Not authorized, please login', 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId);
  if (!user) return next(new ApiError('The user belonging to this token no longer exists', 401));

  if (user.passwordChangedAt) {
    const passwordChangeTime = user.passwordChangedAt.getTime() / 1000;
    if (passwordChangeTime > decoded.iat) 
      return next(new ApiError('Password was changed recently. Please login again', 401));
  }

  req.user = user;
  next();
});

export default protect;
