import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, itemIds } = req.body;
  const op = await prisma.storage.upsert({
    where: {
      id: id,
    },
    update: {
      name: name,
      items: {
        set: itemIds,
      },
    },
    create: {
      name: name,
      items: {
        connect: itemIds,
      },
    },
    include: {
      items: true,
    },
  });

  return res.status(200).json(op);
}
