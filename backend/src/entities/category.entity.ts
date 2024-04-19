import { Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { SubCategory } from './subcategory.entity';
import { BaseCategory, BaseCategoryInput } from './abstractCategory';

@Entity()
@ObjectType()
export class Category extends BaseCategory {
  @ManyToOne(() => SubCategory, (subCategory) => subCategory.category)
  @Field()
  subCategories: SubCategory;
}

// InputType pour la création d'une new category
@InputType()
export class NewCategoryInput extends BaseCategoryInput {
  @Field()
  @Length(2, 30, { message: 'Le nom doit contenir entre 2 et 30 caractères' })
  declare name: string;
}

// InputType pour la mise à jour d'une category
@InputType()
export class UpdateCategoryInput extends BaseCategoryInput {}
