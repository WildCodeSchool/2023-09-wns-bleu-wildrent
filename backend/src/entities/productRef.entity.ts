import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  AfterLoad,
  AfterUpdate,
  AfterInsert,
} from 'typeorm';
// import { Length, Min } from 'class-validator';
import { ObjectType, Field, Int, InputType, ID } from 'type-graphql';
import { SubCategory } from './subcategory.entity';
import { Availability, ProductItem } from './productItem.entity';

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

  @OneToMany(() => ProductItem, (productItem) => productItem.productRef, {
    eager: true, // cette relation sera chargée chaque fois que productRef sera chargé
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @Field(() => [ProductItem])
  productItems: ProductItem[];

  @Column({ default: 0 })
  @Field(() => Int)
  quantity: number;

  @Column({ default: 0 })
  @Field(() => Int)
  quantityAvailable: number;

  recalculateQuantity() {
    if (!this.productItems) {
      this.quantity = 0;
      return;
    }
    this.quantity = this.productItems.length;
  }

  recalculateQuantityAvailable() {
    if (!this.productItems) {
      this.quantityAvailable = 0;
      return;
    }
    this.quantityAvailable = this.productItems.filter(
      (item) => item.availability === Availability.Available,
    ).length;
  }

  // pour mettre à jour automatiquement
  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  updateQuantities() {
    this.recalculateQuantity();
    this.recalculateQuantityAvailable();
  }
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
  @Field(() => Int)
  quantity: number;
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
