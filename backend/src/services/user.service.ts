import { Repository } from 'typeorm';
import db from '../db';
import User, { InputRegister, InputUpdate } from '../entities/user.entity';

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

  async findUserById(id: number | null): Promise<User | null> {
    try {
      if (!id) {
        return null;
      }
      return await this.db.findOne({
        where: { id },
        select: ['email', 'firstname', 'lastname', 'city', 'address', 'cp', 'id', 'role'],
      });
    } catch (e) {
      console.error((e as Error).message);
      return null;
    }
  }

  async updateUser(id: number, updatedUser: InputUpdate) {
    try {
      if (!id) {
        return null;
      }
      const currentUser = await this.db.findOne({
        where: { id },
      });

      if (currentUser) {
        if (updatedUser.firstname) {
          currentUser.firstname = updatedUser.firstname;
        }
        if (updatedUser.lastname) {
          currentUser.lastname = updatedUser.lastname;
        }
        if (updatedUser.email) {
          currentUser.email = updatedUser.email;
        }
        if (updatedUser.address) {
          currentUser.address = updatedUser.address;
        }
        if (updatedUser.city) {
          currentUser.city = updatedUser.city;
        }
        if (updatedUser.cp) {
          currentUser.cp = updatedUser.cp;
        }
        await currentUser.save();
        return currentUser;
      } else {
        return null;
      }
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
