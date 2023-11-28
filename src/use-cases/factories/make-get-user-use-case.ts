import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../get-user'

export function makeGetUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new GetUserUseCase(prismaUserRepository)

  return useCase
}
