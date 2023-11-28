import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getOne } from './get-one'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/users/:userId', { onRequest: [verifyJWT] }, getOne)

  app.post('/sessions', authenticate)
}
