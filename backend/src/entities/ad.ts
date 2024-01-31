import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';
import { Length, Min } from 'class-validator';
import { ObjectType, Field, Int, InputType } from 'type-graphql';

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 50 })
  @Field()
  title: string;

  @Column({ nullable: true, type: 'text' })
  @Field()
  description: string;

  @Column()
  @Field()
  owner: string;

  @Column({ type: 'float' })
  @Field()
  price: number;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  picture: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;
}

@InputType()
export class NewAdInput {
  @Field()
  @Length(5, 50, { message: 'Le titre doit contenir entre 5 et 50 caractères' })
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  @Min(0, { message: 'le prix doit etre positif' })
  price: number;

  @Field()
  location: string;

  @Field()
  picture: string;
}
@InputType()
export class UpdateAdInput {
  @Field({ nullable: true })
  @Length(5, 50, { message: 'Le titre doit contenir entre 5 et 50 caractères' })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  @Min(0, { message: 'le prix doit etre positif' })
  price?: number;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  location?: string;
}
