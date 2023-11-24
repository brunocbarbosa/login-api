import { UserRepository } from '@/repositories/user-repository'
import { User } from '@/utils/user'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface registerUserUseCaseRequest {
  userName: string
  name: string
  password: string
}

interface registerUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async excute({
    userName,
    name,
    password,
  }: registerUserUseCaseRequest): Promise<registerUserUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameUserName =
      await this.userRepository.findByUserName(userName)

    if (userWithSameUserName) throw new UserAlreadyExistsError()

    const user = await this.userRepository.create({
      user_name: userName,
      name,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}
