import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { argon2id, hash /*, verify*/ } from 'argon2';

type ROLE = 'ADMIN' | 'USER';
@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @BeforeInsert()
  protected async hashPassword() {
    this.password = await hash(this.password, hashingOptions);
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

// InputType pour la création d'un nouveau user
@InputType()
export class InputRegister {
  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field({ nullable: true })
  @Column()
  address?: string;

  @Field({ nullable: true })
  @Column()
  cp?: string;

  @Field({ nullable: true })
  @Column()
  city?: string;

  @Field()
  role: ROLE;

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

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  await hash(plainPassword, hashingOptions);
