import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
} from 'typeorm';
import User from './user.entity';
import { Field, Int, ObjectType, Float, InputType, registerEnumType } from 'type-graphql';
import { OrderItem, OrderItemInput } from './orderItem.entity';
import { ObjectId } from '../utils';

export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
}
// Enregistrer l'enum avec type-graphql
registerEnumType(PaymentStatus, {
  name: 'paymentStatus', // Nom du type dans le schéma GraphQL
  description: 'The status payment of an order',
});
@Entity()
@ObjectType()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  @Column({ type: 'float', nullable: true })
  @Field(() => Float)
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  @Field(() => PaymentStatus)
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  @Field()
  orderDate: Date;

  @Column()
  @Field()
  startDate: Date;

  @Column()
  @Field()
  endDate: Date;

  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  numberOfDays: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  shippingAddress: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateDates() {
    const today = new Date();
    if (this.startDate && this.endDate) {
      if (this.startDate > this.endDate && this.startDate != today) {
        throw new Error('Start date must be before end date');
      }
      if (this.startDate.getTime() === this.endDate.getTime()) {
        throw new Error('Start date and end date cannot be the same');
      }
    }
    this.calculateTotalAmount();
  }
  calculateTotalAmount() {
    if (this.startDate && this.endDate) {
      const timeDiff = this.endDate.getTime() - this.startDate.getTime();
      this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.numberOfDays = 0;
    }

    if (this.orderItems && this.orderItems.length > 0) {
      this.totalAmount = this.orderItems.reduce((total, item) => {
        return total + item.quantity * item.unitPrice * this.numberOfDays;
      }, 0);
    } else {
      this.totalAmount = 0;
    }
  }
}
@InputType()
export class OrderInput {
  @Field(() => ObjectId)
  user: ObjectId;

  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[];

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  shippingAddress?: string;
}
