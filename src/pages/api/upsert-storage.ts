import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, itemIds } = req.body;
  const op1 = await prisma.storage.upsert({
    where: {
      id: id,
    },
    update: {
      name: name,
      items: {
        set: [],
      },
    },
    create: {
      name: name,
      items: {
        connect: [],
      },
    },
    include: {
      items: true,
    },
  });
  const op2 = await prisma.storage.update({
    where: {
      id: id,
    },
    data: {
      items: {
        set: itemIds,
      },
    },
    include: {
      items: true,
    },
  });
  return res.status(200).json({ op1, op2 });
}
