import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';

import { Field, Int, Float, ObjectType, InputType } from 'type-graphql';
import { ObjectId } from '../utils';
import { ProductItem } from './productItem.entity';

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToMany(() => ProductItem, (productItem) => productItem.orderItems)
  @JoinTable()
  @Field(() => [ProductItem])
  productItems: ProductItem[];

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  unitPrice: number;
}

@InputType()
export class OrderItemInput {
  @Field(() => ObjectId)
  productRef: ObjectId;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;
}
