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

  async findUserById(id: number) {
    try {
      return await this.db.findOneBy({ id });
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
        if (updatedUser.picture) {
          currentUser.picture = updatedUser.picture;
        }
        if (updatedUser.emailConfirmationToken) {
          currentUser.emailConfirmationToken = updatedUser.emailConfirmationToken;
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

  async deleteUser(id: number) {
    const userToDelete = await this.db.findOneBy({ id });
    if (userToDelete) {
      await this.db.delete({ id });
      return { success: true, message: `User ${userToDelete.id} deleted` };
    } else {
      return { success: false, message: 'User not exist' };
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
