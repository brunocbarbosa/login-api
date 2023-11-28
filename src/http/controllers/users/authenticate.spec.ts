import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      userName: 'bruno_barbosa',
      name: 'Bruno',
      password: '123456',
    })

    const res = await request(app.server).post('/sessions').send({
      userName: 'bruno_barbosa',
      password: '123456',
    })

    expect(res.statusCode).toEqual(200)
  })
})
