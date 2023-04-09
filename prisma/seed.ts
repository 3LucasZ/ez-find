import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const screw = await prisma.item.create({
    data: {
      name: "screw",
    },
  });
  const wire = await prisma.item.create({
    data: {
      name: "wire",
    },
  });
  const usb = await prisma.item.create({
    data: {
      name: "usb",
    },
  });
  const huberOffice = await prisma.storage.create({
    data: {
      name: "huber office",
    },
  });
  const IC = await prisma.storage.create({
    data: {
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
