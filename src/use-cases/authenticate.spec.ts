import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialError } from './errors/invalid-credential-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      user_name: 'bruno_barbosa',
      name: 'Bruno',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userName: 'bruno_barbosa',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(() =>
      sut.execute({
        userName: 'bruno_barbosa',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await usersRepository.create({
      user_name: 'bruno_barbosa',
      name: 'Bruno',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userName: 'bruno_barbosa',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
