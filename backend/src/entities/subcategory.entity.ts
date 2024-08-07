import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, InputType, Int } from 'type-graphql';
import { Length } from 'class-validator';
import { Category } from './category.entity';
import { BaseCategory, BaseCategoryInput } from './abstractCategory';
import { ProductRef } from './productRef.entity';

@Entity()
@ObjectType()
export class SubCategory extends BaseCategory {
  @ManyToOne(() => Category, (category) => category.subCategories, { eager: true })
  @Field(() => Category, { nullable: true })
  category: Category;

  @OneToMany(() => ProductRef, (productRef) => productRef.subCategory)
  @Field(() => [ProductRef])
  productRefs: ProductRef[];
}

// InputType pour la création d'une new subCategory
@InputType()
export class NewSubCategoryInput extends BaseCategoryInput {
  @Field()
  @Length(2, 30, { message: 'Le nom doit contenir entre 2 et 30 caractères' })
  declare name: string;
  @Field(() => Int)
  categoryId: number;
}

// InputType pour la mise à jour d'une subCategory
@InputType()
export class UpdateSubCategoryInput extends BaseCategoryInput {
  @Field(() => Int, { nullable: true })
  categoryId?: number;
}
