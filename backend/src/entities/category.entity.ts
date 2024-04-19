import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { SubCategory } from './subcategory.entity';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field()
  image: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  @Field(() => [SubCategory])
  subCategories: SubCategory[];
}
