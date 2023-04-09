import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, itemIds } = req.body;
  const result = await prisma.storage.create({
    data: {
      name: name,
      items: { connect: itemIds },
    },
    include: {
      items: true,
    },
  });
  return res.status(200).json(result);
}
