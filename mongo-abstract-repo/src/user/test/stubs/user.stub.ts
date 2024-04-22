import { User } from 'src/user/schemas/user.schema'

export const userStub = (userId?: string, email?: string, age?: number, favoriteFoods?: string[]) => {
  const user: User = {
    userId: userId ?? '123',
    email: email ?? 'email@email.com',
    age: age ?? 20,
    favoriteFoods: favoriteFoods ?? ['apple', 'pizza'],
  }

  return user
}
