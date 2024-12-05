import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
    async findByGoogleId(googleId: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { googleId, deletedAt: null }
        });
    }

    async create(data: {
        email: string;
        name: string | null;
        avatar: string | null;
        googleId: string;
    }): Promise<User> {
        return prisma.user.create({
            data
        });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id, deletedAt: null }
        });
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        })
    }
}