import { User } from "@/utils/user";

export interface UserRepository{
  findById(id: string): Promise<User | null>
  findByUserName(userName: string): Promise<User | null>
  create(data: User): Promise<User>
}