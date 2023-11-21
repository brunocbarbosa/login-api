import { User } from "@/utils/user";
import { UserRepository } from "../user-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UserRepository{
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if(!user) return null

    return user
  }

  async findByUserName(userName: string) {
    const user = this.items.find((item) => item.user_name === userName)

    if(!user) return null

    return user
  }

  async create(data: User) {
    const user = {
      id: randomUUID(),
      user_name: data.user_name,
      name: data.name,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }

}