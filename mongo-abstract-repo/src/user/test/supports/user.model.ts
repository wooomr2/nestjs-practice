import { MockModel } from 'src/database/test/support/mock.model'
import { User } from 'src/user/schemas/user.schema'
import { userStub } from '../stubs/user.stub'

export class UserModel extends MockModel<User> {
  protected entityStub: User = userStub()
}
