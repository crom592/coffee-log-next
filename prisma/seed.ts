import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const userId = 'cm44cg8n100008v809pz12pmo'; // Replace with your user ID

  // Create default beans
  const bean1 = await prisma.bean.create({
    data: {
      name: 'Ethiopian Yirgacheffe',
      roastLevel: 'Light',
      origin: 'Ethiopia',
      description: 'Bright and floral with citrus notes',
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  const bean2 = await prisma.bean.create({
    data: {
      name: 'Colombian Supremo',
      roastLevel: 'Medium',
      origin: 'Colombia',
      description: 'Sweet caramel with balanced acidity',
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  // Create default brewing methods
  const method1 = await prisma.brewMethod.create({
    data: {
      name: 'V60',
      description: 'Hario V60 pour-over method',
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  const method2 = await prisma.brewMethod.create({
    data: {
      name: 'Espresso',
      description: 'Traditional espresso shot',
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  console.log({ bean1, bean2, method1, method2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
