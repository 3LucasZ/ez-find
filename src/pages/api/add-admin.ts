import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;
  const op = await prisma.admin.create({
    data: {
      email: email,
    },
  });
  return res.status(200).json(op);
}
