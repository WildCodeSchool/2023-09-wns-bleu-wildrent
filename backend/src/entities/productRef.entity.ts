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

import { ObjectType, Field, Int, InputType } from 'type-graphql';
import { SubCategory } from './subcategory.entity';
import { Availability, ProductItem } from './productItem.entity';
import { IsInt, Length, Matches, Min } from 'class-validator';
import { ObjectId } from '../utils';

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

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.productRefs)
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @OneToMany(() => ProductItem, (productItem) => productItem.productRef, {
    eager: true,
    cascade: true,
  })
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
  @Length(5, 50, { message: 'Le titre doit contenir entre 5 et 50 caractères' })
  name: string;
  @Field()
  @Length(5, 250, { message: 'Le titre doit contenir entre 5 et 250 caractères' })
  description: string;
  @Field()
  @Matches(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i, { message: "Le format de l'image est invalide" })
  image: string;
  @Field()
  @Min(0, { message: 'le prix doit etre positif' })
  priceHT: number;
  @Field(() => ObjectId)
  subCategory: ObjectId;
  @Field(() => Int)
  @IsInt({ message: 'la quantité doit être un entier' })
  @Min(0, { message: 'la quantité doit être supérieure ou égale à 0' })
  quantity: number;
}

@InputType()
export class UpdateProductRef {
  @Field({ nullable: true })
  @Length(5, 50, { message: 'Le titre doit contenir entre 5 et 50 caractères' })
  name?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  image?: string;
  @Field({ nullable: true })
  @Min(0, { message: 'le prix doit etre positif' })
  priceHT?: number;
  @Field(() => ObjectId, { nullable: true })
  subCategory?: ObjectId;
  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'la quantité doit être un entier' })
  @Min(0, { message: 'la quantité doit être supérieure ou égale à 0' })
  quantity?: number;
}
