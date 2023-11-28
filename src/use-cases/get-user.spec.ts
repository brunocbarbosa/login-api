import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserUseCase } from './get-user'
import { UserNotFoundError } from './errors/user-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get a user', async () => {
    const createdUser = await usersRepository.create({
      user_name: 'bruno_barbosa',
      name: 'Bruno',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(expect.any(String))
    expect(user.user_name).toEqual('bruno_barbosa')
  })

  it('should not be able to register with same userName', async () => {
    await expect(() =>
      sut.execute({
        userId: 'null-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
