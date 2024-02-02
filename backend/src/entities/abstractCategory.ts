import { Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Field, Int, InputType, ObjectType } from 'type-graphql';
import { Length } from 'class-validator';

// Classe de base abstraite
@ObjectType()
export class BaseCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description?: string;

  @Column()
  @Field()
  image?: string;
}

// Classe de base InputType
@InputType()
export class BaseCategoryInput {
  @Field()
  @Length(2, 30, { message: 'Le nom doit contenir entre 2 et 30 caractères' })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;
}
