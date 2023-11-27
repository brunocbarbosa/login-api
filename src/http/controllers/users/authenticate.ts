import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateSchema = z.object({
    userName: z.string(),
    password: z.string(),
  })

  const { userName, password } = authenticateSchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUserUseCase()

    const { user } = await authenticateUseCase.execute({
      userName,
      password,
    })

    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return rep.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
