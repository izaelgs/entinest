import { H3Event, readBody, setResponseStatus } from 'h3';
import * as service from '../services/userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const signIn = async (event: H3Event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    setResponseStatus(event, 400);
    return { message: 'Email and password are required' };
  }

  const user = await service.findByEmail(email);
  if (!user) {
    setResponseStatus(event, 401);
    return { message: 'Invalid credentials' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    setResponseStatus(event, 401);
    return { message: 'Invalid credentials' };
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60,
  });

  setResponseStatus(event, 200);
  return { user: { id: user.id, email: user.email, name: user.name } };
};

export const signOut = async (event: H3Event) => {
  deleteCookie(event, 'auth_token');
  setResponseStatus(event, 200);
  return { message: 'Signed out successfully' };
};

export const signUp = async (event: H3Event) => {
  const { email, name, password }: {
    email: string;
    name: string;
    password: string;
  } = await readBody(event);

  if (!email || !password || !name) {
    setResponseStatus(event, 400);
    return { message: 'Email, name, and password are required' };
  }

  const existingUser = await service.findByEmail(email);
  if (existingUser) {
    setResponseStatus(event, 409);
    return { message: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await service.createUser({
    email,
    name,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60,
  });

  setResponseStatus(event, 201);
  return { token, user: { id: newUser.id, email: newUser.email, name: newUser.name } };
};

const verifyToken = (event: H3Event): { id: string; email: string } | null => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    return decoded;
  } catch (err) {
    return null;
  }
};

export const getSession = async (event: H3Event) => {
  const decodedToken = verifyToken(event);

  if (!decodedToken) {
    setResponseStatus(event, 401);
    return { message: 'Unauthorized' };
  }

  const user = await service.findById(decodedToken.id);

  if (!user) {
    setResponseStatus(event, 404);
    return { message: 'User not found' };
  }

  setResponseStatus(event, 200);
  return { user: { id: user.id, email: user.email, name: user.name } };
};

export const findAll = async (event: H3Event) => {
  const users = await service.findAll();
  setResponseStatus(event, 200);
  return users;
}

export const findById = async (event: H3Event) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    setResponseStatus(event, 400);
    return { message: 'User ID is required' };
  }

  const user = await service.findById(id);
  if (user) {
    setResponseStatus(event, 200);
    return user;
  } else {
    setResponseStatus(event, 404);
    return { message: 'User not found' };
  }
}

export const createUser = async (event: H3Event) => {
  const body = await readBody(event);
  const newUser = await service.createUser(body);
  setResponseStatus(event, 201);
  return newUser;
}

export const updateUser = async (event: H3Event) => {
  const id = event.context?.params?.id;
  if (!id) {
    setResponseStatus(event, 400);
    return { message: 'User ID is required' };
  }

  const body = await readBody(event);
  const updatedUser = await service.updateUser(id, body);
  if (updatedUser) {
    setResponseStatus(event, 200);
    return updatedUser;
  } else {
    setResponseStatus(event, 404);
    return { message: 'User not found' };
  }
}

export const deleteUser = async (event: H3Event) => {
  const id = event.context?.params?.id;
  if (!id) {
    setResponseStatus(event, 400);
    return { message: 'User ID is required' };
  }

  const deleted = await service.deleteUser(id);
  if (deleted) {
    setResponseStatus(event, 204);
    return null;
  } else {
    setResponseStatus(event, 404);
    return { message: 'User not found' };
  }
}
