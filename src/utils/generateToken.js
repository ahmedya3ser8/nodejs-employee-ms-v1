import jwt from 'jsonwebtoken';

import { cookieConfig } from "../config/cookie.js";

const generateToken = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  res.cookie('ems_access_token', token, cookieConfig);
  return token;
}

export default generateToken;
