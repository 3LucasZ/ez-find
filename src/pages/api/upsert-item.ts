import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, storageIds } = req.body;
  const op1 = await prisma.item.upsert({
    where: {
      id: id,
    },
    update: {
      name: name,
      storages: {
        set: [],
      },
    },
    create: {
      name: name,
      storages: {
        connect: [],
      },
    },
    include: {
      storages: true,
    },
  });
  const op2 = await prisma.item.update({
    where: {
      id: id,
    },
    data: {
      storages: {
        set: storageIds,
      },
    },
    include: {
      storages: true,
    },
  });
  return res.status(200).json({ op1, op2 });
}
