import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  ObjectId,
  ManyToMany,
} from 'typeorm';
// import { Length, Min } from 'class-validator';
import { ObjectType, Field, Int, registerEnumType, InputType } from 'type-graphql';
import { ProductRef } from './productRef.entity';
import { OrderItem } from './orderItem.entity';

export enum Availability {
  Unavailable = 'unavailable',
  Available = 'available',
}
// Enregistrer l'enum avec type-graphql
registerEnumType(Availability, {
  name: 'Availability', // Nom du type dans le schéma GraphQL
  description: 'The availability status of a product item',
});
@Entity()
@ObjectType()
export class ProductItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => ProductRef, (productRef) => productRef.productItems, {
    nullable: false,
  })
  @Field(() => ProductRef)
  productRef: ProductRef;

  @Column({
    type: 'enum',
    enum: Availability,
    default: Availability.Available,
  })
  @Field(() => Availability)
  availability: Availability;

  @ManyToMany(() => OrderItem, (orderItem) => orderItem.productItems)
  orderItems: OrderItem[];
}

@InputType()
export class InputProductItem {
  @Field(() => ObjectId, { nullable: false })
  productRef: ObjectId;
}
