# Login API

## About 
An API with study finality. The objective is show a login function with using JWT token, you can create a user, after you can login with this user, returning a Bearer token, after that you can use this token to access the user infos.

## Concepts
- Typescript
- Fastify
- Fasstify JWT
- Docker/Docker Compose
- Vitest
- Supertest
- Zod
- SOLID
- Prisma ORM
- PostgreSQL
- ESLint



## Instruction
- Clone the repository from Github;
- Type the command `npm install` or `npm i` to install all dependences;
- Type `docker compose up -d` to create the database container;
- Type `npm run dev`
- You can run the API creating build file with `npm build` after type `npm start`
- To enter in develop just type `npm run dev`

## Routes
## Contest
- POST | /users | Register a new user |   userName: Sring,
                                                name: String,
                                                password: String

- POST | /sessions | Return a token 
- GET | /users/:userId | Bearer Token | Return user infos