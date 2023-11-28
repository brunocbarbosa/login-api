import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const user = await prisma.user.create({
    data: {
      user_name: 'bruno_barbosa',
      name: 'Bruno',
      password_hash: await hash('123456', 6),
    },
  })

  const authRes = await request(app.server).post('/sessions').send({
    userName: 'bruno_barbosa',
    password: '123456',
  })

  const { token } = authRes.body

  return {
    user,
    token,
  }
}
