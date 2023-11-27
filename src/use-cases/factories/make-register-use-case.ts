import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(prismaUserRepository)

  return useCase
}
