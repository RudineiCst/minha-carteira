import { Request, Response } from 'express';
import BcryptProvider from '../providers/HashProvider/implementations/Bcrypt';
import SingUpServices from '../services/SingUpServices';
import UserRepository from '../repositories/UsersRepository';


class UserController {
  async create(request: Request, response: Response) {

    const { name, email, password, password_confirm } = request.body;

    if (!name) return response.json({ message: 'name is required' });

    if (!email) return response.json({ message: 'email is required' });

    if (!password) return response.json({ message: 'password is required' });

    if (!password_confirm)
      return response.json({ message: 'password is required' });

    if (password !== password_confirm)
      return response.json({ message: 'password not match' });

    const userRepository = new UserRepository();
    const bcyrpt = new BcryptProvider();
    const singUpServices = new SingUpServices(userRepository, bcyrpt);

    const userResponse = await singUpServices.execute({
      name,
      email,
      password,
    });

    return response.json(userResponse);
  }
}

export default new UserController();
