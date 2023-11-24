import { UserRepository } from '@/repositories/user-repository'
import { User } from '@/utils/user'
import { InvalidCredentialError } from './errors/invalid-credential-error'
import { compare } from 'bcryptjs'

interface authenticateUseCaseRequest {
  userName: string
  password: string
}

interface authenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userName,
    password,
  }: authenticateUseCaseRequest): Promise<authenticateUseCaseResponse> {
    const user = await this.userRepository.findByUserName(userName)

    if (!user) throw new InvalidCredentialError()

    const doesPassswordMatches = await compare(password, user.password_hash)

    if (!doesPassswordMatches) throw new InvalidCredentialError()

    return {
      user,
    }
  }
}
