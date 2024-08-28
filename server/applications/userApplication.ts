import { H3Event } from 'h3';
import * as service from '../services/userService';

export const helloWorld = (event: H3Event) => {

  setResponseStatus(event, 200);

  return 'Hello World!';
}

export const findAll = async (event: H3Event) => {

  const users = await service.findAll();

  setResponseStatus(event, 200);

  return users;
}