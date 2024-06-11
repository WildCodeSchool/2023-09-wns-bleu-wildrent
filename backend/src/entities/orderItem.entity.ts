import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from 'typeorm';
import { Order } from './order.entity';
import { ProductRef } from './productRef.entity';
import { ProductItem } from './productItem.entity';
import { Field, Int, Float, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => ProductRef)
  @Field(() => ProductRef)
  productRef: ProductRef;

  @ManyToOne(() => ProductItem)
  @Field(() => ProductItem)
  productItem: ProductItem;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  unitPrice: number;
}
