import { defineEventHandler, H3Event } from 'h3';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default defineEventHandler((event: H3Event) => {
  if (event.path.includes('signin') || event.path.includes('signup') || event.path === '/api/v1/' || !event.path.includes('/api/v1')) {
    return;
  }

  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
});

