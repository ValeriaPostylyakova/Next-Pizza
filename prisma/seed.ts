import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'USER TEST',
                email: 'user@mail.ru',
                password: hashSync('1g4g7gs5l5vc', 10),
                role: 'USER',
                cardId: 0,
                verify: new Date(),
            },
            {
                fullName: 'ADMIN TEST',
                email: 'admin@mail.ru',
                password: hashSync('22222', 10),
                role: 'ADMIN',
                cardId: 1,
                verify: new Date(),
            },
        ],
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (err) {
        console.error(err);
    }
}

main().then(async () => {
    try {
        await prisma.$disconnect();
    } catch (err) {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    }
});
