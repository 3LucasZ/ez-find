import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, locations } = req.body;
  const result = await prisma.item.create({
    data: {
      name: name,
      locations: locations,
    },
  });
  return res.status(200).json(result);
}
