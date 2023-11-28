import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'

let userRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      userName: 'bruno_barbosa',
      name: 'Bruno',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {
    const { user } = await sut.execute({
      userName: 'bruno_barbosa',
      name: 'Bruno',
      password: '123456',
    })

    const isPasswordCorrectelyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectelyHashed).toBe(true)
  })

  it('should not be able to register with same userName', async () => {
    const userName = 'bruno_barbosa'

    await sut.execute({
      userName,
      name: 'Bruno',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        userName,
        name: 'Bruno',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
