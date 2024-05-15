import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
// import { Length, Min } from 'class-validator';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';
import { ProductRef } from './productRef.entity';

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

  @ManyToOne(() => ProductRef, (productRef) => productRef.productItems, { nullable: false })
  @Field(() => ProductRef)
  productRef: ProductRef;

  @Column({
    type: 'enum',
    enum: Availability,
    default: Availability.Available,
  })
  @Field(() => Availability)
  availability: Availability;
}
