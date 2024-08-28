import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (): Promise<User[]> => {
  return await
    prisma.user.findMany();
}