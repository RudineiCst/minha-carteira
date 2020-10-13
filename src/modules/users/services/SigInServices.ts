import UserRepository from '../repositories/UsersRepository';
import Bcrypt from '../providers/HashProvider/implementations/Bcrypt';

interface UserAuthDTO {
  email: string;
  password: string;
}

class SigInServices {
  repository;

  cryptPovider;

  constructor(Repository: UserRepository, CryptProvider: Bcrypt) {
    this.repository = Repository;
    this.cryptPovider = CryptProvider;
  }
  // eslint-disable-next-line
  async execute({ email, password }: UserAuthDTO): Promise<any> {
    const user = this.repository.findByEmail(email);

    if (!user) {
      return { error: 'email is not found' };
    }
    console.log(user);
    return user;
  }
}
export default SigInServices;