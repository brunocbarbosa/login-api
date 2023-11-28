import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get One User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get one user', async () => {
    const { user, token } = await createAndAuthenticateUser(app)

    const res = await request(app.server)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(res.statusCode).toEqual(200)
  })
})
