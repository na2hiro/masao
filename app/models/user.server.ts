import type { Password, Account } from "@prisma/client";
import bcrypt from "@node-rs/bcrypt";

import { prisma } from "~/db.server";

export type { Account } from "@prisma/client";

export async function getUserById(id: Account["id"]) {
  return prisma.account.findUnique({ where: { id } });
}

export async function getUserByEmail(email: Account["email"]) {
  return prisma.account.findUnique({ where: { email } });
}

export async function createUser(email: Account["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.account.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: Account["email"]) {
  return prisma.account.delete({ where: { email } });
}

export async function verifyLogin(
  email: Account["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.account.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.verify(password, userWithPassword.password.hash);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
