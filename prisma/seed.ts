import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const screw = await prisma.item.create({
    data: {
      id: 1,
      name: "screw",
    },
  });
  const wire = await prisma.item.create({
    data: {
      id: 2,
      name: "wire",
    },
  });
  const usb = await prisma.item.create({
    data: {
      id: 3,
      name: "usb",
    },
  });
  const huberOffice = await prisma.storage.create({
    data: {
      id: 1,
      name: "huber office",
    },
  });
  const IC = await prisma.storage.create({
    data: {
      id: 2,
      name: "IC",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
