import { Entity, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { SubCategory } from './subcategory.entity';
import { BaseCategory } from './abstractCategory';

@Entity()
@ObjectType()
export class Category extends BaseCategory {
  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  @Field(() => [SubCategory])
  subCategories: SubCategory[];
}
