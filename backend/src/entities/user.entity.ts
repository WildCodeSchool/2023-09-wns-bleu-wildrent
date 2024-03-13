import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { argon2id, verify, hash } from 'argon2';

type ROLE = 'ADMIN' | 'USER';
@ObjectType()
@Entity()
export default class User extends BaseEntity {
  // static findUserById(id: number): User | PromiseLike<User | null> | null {
  //   throw new Error('Method not implemented.');
  // }
  @BeforeInsert()
  protected async hashPassword() {
    this.password = await hash(this.password);
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column({ nullable: true })
  address?: string;

  @Field()
  @Column({ nullable: true })
  cp?: string;

  @Field()
  @Column({ nullable: true })
  city?: string;

  @Field()
  @Column({ type: 'text', enum: ['ADMIN', 'USER'], default: 'USER' })
  role: ROLE;

  @Field()
  @Column({
    unique: true,
    transformer: {
      from(value: string) {
        return value.toLowerCase();
      },
      to(value: string) {
        return value.toLowerCase();
      },
    },
  })
  email: string;

  @Field()
  @Column()
  password: string;
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

// InputType pour la création d'un nouveau user
@InputType()
export class InputRegister {
  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

// InputType pour la connexion
@InputType()
export class InputLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2id,
  };

  return await verify(hashedPassword, plainPassword, hashingOptions);
};
