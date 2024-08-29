import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateUserData = {
  email: string;
  name: string;
  password: string;
};

export const findAll = async (): Promise<User[]> => {
  return await prisma.user.findMany();
}

export const findById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export const createUser = async (data: CreateUserData): Promise<User> => {
  return await prisma.user.create({
    data,
  });
}

export const updateUser = async (id: string, data: Partial<User>): Promise<User | null> => {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export const findByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
