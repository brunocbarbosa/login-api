import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(req: FastifyRequest, rep: FastifyReply) {
  const registerUserSchema = z.object({
    userId: z.string(),
  })

  const { userId } = registerUserSchema.parse(req.params)

  try {
    const registerUserUseCase = makeGetUserUseCase()

    await registerUserUseCase.execute({
      userId,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(200).send()
}
