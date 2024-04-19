import 'dotenv/config';
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import User, {
  InputLogin,
  InputRegister,
  verifyPassword,
  Message,
  Profile,
  InputUpdate,
} from '../entities/user.entity';
import { ContextType } from '../types';
import db from '../db';

@Resolver()
export default class UserResolver {
  private userService = new UserService();
  @Mutation(() => Message)
  async register(@Arg('newUser') newUser: InputRegister) {
    const alreadyRegistered = Boolean(await this.userService.findUserByEmail(newUser.email));
    if (alreadyRegistered) {
      return { success: false, message: 'Already Registered' };
    } else {
      try {
        await this.userService.createUser(newUser);
        return { success: true, message: 'Account Created !' };
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }
  @Mutation(() => Message)
  async login(@Arg('user') { email, password }: InputLogin, @Ctx() ctx: ContextType) {
    try {
      const user = await db.getRepository(User).findOne({ where: { email } });
      if (
        user === null ||
        typeof user.password !== 'string' ||
        !(await verifyPassword(password, user.password))
      ) {
        return { success: false, message: 'Wrong Credentials...' };
      }
      const secret = process.env.JWT_PRIVATE_KEY as string;
      const token = jwt.sign({ userId: user.id, role: user.role }, secret);
      if (token) {
        ctx.res.cookie('token', token, {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: false, // si true pas possible de le récupérer en front
        });
        ctx.currentUser = user;
        return { success: true, message: 'Authenticated' };
      }
    } catch (err) {
      console.error(err as Error);
      return { success: false, message: `Login Mutation: ${(err as Error).message}` };
    }
  }

  @Mutation(() => Message)
  async logout(@Ctx() { req, res, currentUser }: ContextType): Promise<Message> {
    const token = req.headers.cookie?.split('token=')[1] || null;
    if (currentUser && token) {
      res.clearCookie('token');
      return { success: true, message: 'logged out' };
    } else {
      return { success: false, message: 'no currentUser' };
    }
  }

  @Mutation(() => Message)
  async updateUser(
    @Arg('updatedUser') updatedUser: InputUpdate,
    @Ctx() { currentUser }: ContextType,
  ): Promise<Message> {
    try {
      if (!currentUser) {
        return { success: false, message: 'no currentUser' };
      }
      const updated = await this.userService.updateUser(currentUser.id, updatedUser);
      if (!updated) {
        return { success: false, message: 'cannot update user' };
      }
      return { success: true, message: 'user updated successfully' };
    } catch (e) {
      console.error((e as Error).message);
      return { success: false, message: `Error updating user: ${(e as Error).message}` };
    }
  }

  @Mutation(() => Message)
  async deleteUser(
    @Arg('userId', () => Int) userId: number,
    @Ctx() { currentUser }: ContextType,
  ): Promise<Message> {
    try {
      console.log(currentUser?.id, userId);
      if (!currentUser) {
        return { success: false, message: 'no currentUser' };
      }
      if (currentUser.role === 'ADMIN' || currentUser.id === userId) {
        const res = await this.userService.deleteUser(userId);
        return res;
      } else {
        return { success: false, message: 'Unauthorized' };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { success: false, message: `Cannot delete user: ${(e as Error).message}` };
    }
  }

  @Authorized()
  @Query(() => [User])
  async allUsers() {
    return await User.find({ order: { id: 'desc' } });
  }

  @Authorized()
  @Query(() => Profile)
  async getProfile(@Ctx() { currentUser }: ContextType): Promise<Profile | Message> {
    try {
      if (!currentUser) {
        return { success: false, message: 'no currentUser' };
      }
      return (await this.userService.findUserById(currentUser.id)) as Profile;
    } catch (e) {
      console.error((e as Error).message);
      return { success: false, message: `Cannot find current user: ${(e as Error).message}` };
    }
  }
}
