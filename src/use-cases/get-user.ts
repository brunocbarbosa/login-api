import { UserRepository } from '@/repositories/user-repository'
import { User } from '@/utils/user'
import { UserNotFoundError } from './errors/user-not-found-error'

interface getUserUseCaseRequest {
  id: string
}

interface getUserUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: getUserUseCaseRequest): Promise<getUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new UserNotFoundError()

    return {
      user,
    }
  }
}
