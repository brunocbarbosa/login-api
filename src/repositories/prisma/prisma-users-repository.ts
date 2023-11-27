import { User } from '@/utils/user'
import { UserRepository } from '../user-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByUserName(userName: string) {
    return prisma.user.findUnique({
      where: {
        user_name: userName,
      },
    })
  }

  async create(data: User) {
    return prisma.user.create({
      data,
    })
  }
}
