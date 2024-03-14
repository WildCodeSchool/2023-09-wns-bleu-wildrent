import { Repository } from 'typeorm';
import db from '../db';
import User, { InputRegister } from '../entities/user.entity';

export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = db.getRepository(User);
  }

  async findUserByEmail(email: string) {
    try {
      return await this.db.findOneBy({ email });
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async findUserById(id: number) {
    try {
      return await this.db.findOneBy({ id });
    } catch (e) {
      console.error((e as Error).message);
      return null;
    }
  }

  async createUser({ firstname, lastname, email, password }: InputRegister) {
    try {
      const newUser = this.db.create({ firstname, lastname, email, password, role: 'USER' });
      return await this.db.save(newUser);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}
