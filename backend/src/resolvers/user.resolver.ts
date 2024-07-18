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
  InputUpdateAdmin,
} from '../entities/user.entity';
import { ContextType } from '../types';
import db from '../db';
import env from '../env';
import { sendEmail } from '../mail';
import { GraphQLError } from 'graphql';
import crypto from 'crypto';

@Resolver()
export default class UserResolver {
  private userService = new UserService();
  @Mutation(() => Message)
  async register(@Arg('newUser') newUser: InputRegister): Promise<Message> {
    const alreadyRegistered = Boolean(await this.userService.findUserByEmail(newUser.email));
    if (alreadyRegistered) {
      return { success: false, message: 'Already Registered' };
    } else {
      try {
        const token = crypto.randomBytes(20).toString('hex');
        await this.userService.createUser(newUser);
        const user = await this.userService.findUserByEmail(newUser.email);

        if (user && (user as User).id) {
          await this.userService.updateUser((user as User).id, {
            ...user,
            emailConfirmationToken: token,
          });
        } else {
          console.error('User ID is undefined');
        }

        await sendEmail(
          newUser.email,
          'Bienvenue sur Wildrent',
          `Bienvenue parmi nous ${newUser.firstname}. Merci de bien vouloir cliquer sur ce lien pour confirmer votre email : ${env.FRONTEND_URL}/auth/emailConfirmation?token=${token}`,
        );

        return { success: true, message: 'Account Created!' };
      } catch (e) {
        console.error((e as Error).message);
        return { success: false, message: 'Error creating account' };
      }
    }
  }

  @Mutation(() => String)
  async confirmEmail(@Arg('token') token: string): Promise<string> {
    const user = await db.getRepository(User).findOne({ where: { emailConfirmationToken: token } });
    console.log(token, user);

    if (user === null) throw new GraphQLError('Le token est invalide ou expiré');

    user.emailVerified = true;
    user.emailConfirmationToken = '';
    user.save();

    return 'ok';
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
          httpOnly: true,
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

  @Authorized()
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

  @Authorized(['ADMIN'])
  @Mutation(() => Message)
  async updateUserAdmin(@Arg('updatedUser') updatedUser: InputUpdateAdmin): Promise<Message> {
    try {
      const updated = await this.userService.updateUserAdmin(updatedUser.id, updatedUser);
      if (!updated) {
        return { success: false, message: 'cannot update user' };
      }
      return { success: true, message: 'user updated successfully' };
    } catch (e) {
      console.error((e as Error).message);
      return { success: false, message: `Error updating user: ${(e as Error).message}` };
    }
  }

  @Authorized()
  @Mutation(() => Message)
  async deleteUser(
    @Arg('userId', () => Int) userId: number,
    @Ctx() { currentUser }: ContextType,
  ): Promise<Message> {
    try {
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

  @Query(() => Message)
  async checkIfLoggedIn(@Ctx() { currentUser }: ContextType): Promise<Message> {
    const isLoggedIn = Boolean(currentUser?.id);
    const isAdmin = Boolean(currentUser?.role === 'ADMIN');
    const message = isLoggedIn ? 'User already authenticated' : 'User not authenticated';
    return { success: isLoggedIn, message, isAdmin };
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
