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
import { Field, Int, ObjectType, Float } from 'type-graphql';
import { OrderItem } from './orderItem.entity';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  @Field(() => [OrderItem])
  items: OrderItem[];

  @Column({ type: 'float', nullable: true })
  @Field(() => Float)
  totalAmount: number;

  @Column()
  @Field()
  paymentStatus: string;

  @Column()
  @Field()
  paymentMethod: string;

  @CreateDateColumn()
  @Field()
  orderDate: Date;

  @Column({ nullable: true })
  @Field()
  startDate: Date;

  @Column({ nullable: true })
  @Field()
  endDate: Date;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int)
  numberOfDays: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  shippingAddress: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  billingAddress: string;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotalAmount() {
    if (this.startDate && this.endDate) {
      const timeDiff = this.endDate.getTime() - this.startDate.getTime();
      this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.numberOfDays = 0;
    }

    if (this.items && this.items.length > 0) {
      this.totalAmount = this.items.reduce((total, item) => {
        return total + item.quantity * item.unitPrice * this.numberOfDays;
      }, 0);
    } else {
      this.totalAmount = 0;
    }
  }
}
