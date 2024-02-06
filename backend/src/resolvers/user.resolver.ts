import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import User, { InputLogin, InputRegister, verifyPassword, Message } from '../entities/user.entity';
import { ContextType } from '../types';
import db from '../db';

@Resolver()
export default class UserResolver {
  @Mutation(() => Message)
  async register(@Arg('newUser') newUser: InputRegister) {
    const alreadyRegistered = Boolean(await new UserService().findUserByEmail(newUser.email));
    if (alreadyRegistered) {
      return { success: false, message: 'Already Registered' };
    } else {
      try {
        await new UserService().createUser(newUser);
        return { success: false, message: 'Account Created !' };
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }
  @Mutation(() => String)
  async login(@Arg('user') { email, password }: InputLogin, @Ctx() { res }: ContextType) {
    const user = await db.getRepository(User).findOne({ where: { email } });
    if (
      user === null ||
      typeof user.password !== 'string' ||
      !(await verifyPassword(password, user.password))
    )
      throw new Error('invalid credentials');
    const secret = process.env.JWT_PRIVATE_KEY as string;
    console.log(secret);
    const token = jwt.sign({ userId: user.id }, secret);

    res.cookie('token', token, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });

    return token;
  }
}
