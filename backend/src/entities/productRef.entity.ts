import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Length, Min } from 'class-validator';
import { ObjectType, Field, Int, InputType, ID } from 'type-graphql';
import { SubCategory } from './subcategory.entity';

@Entity()
@ObjectType()
export class ProductRef extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 50 })
  @Field()
  name: string;

  @Column({ nullable: true, type: 'text' })
  @Field()
  description: string;

  @Column()
  @Field()
  image: string;

  @Column({ type: 'float' })
  @Field()
  priceHT: number;

  @Field(() => SubCategory)
  @ManyToOne(() => SubCategory, (subcategory) => subcategory.productRefs)
  subCategory: SubCategory;
}

@InputType()
export class InputProductRef {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  image: string;
  @Field()
  priceHT: number;
  @Field(() => ID)
  subCategoryId: number;
}
// @InputType()
// export class UpdateAdInput {
//   @Field({ nullable: true })
//   @Length(5, 50, { message: 'Le titre doit contenir entre 5 et 50 caractères' })
//   title?: string;

//   @Field({ nullable: true })
//   description?: string;

//   @Field({ nullable: true })
//   owner?: string;

//   @Field({ nullable: true })
//   @Min(0, { message: 'le prix doit etre positif' })
//   price?: number;

//   @Field({ nullable: true })
//   city?: string;

//   @Field({ nullable: true })
//   picture?: string;

//   @Field({ nullable: true })
//   location?: string;
// }
