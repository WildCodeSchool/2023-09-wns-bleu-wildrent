import { Repository } from 'typeorm';
import db from '../db';
import { ProductItem } from '../entities/productItem.entity';
export default class ProductItemService {
  db: Repository<ProductItem>;
  constructor() {
    this.db = db.getRepository(ProductItem);
  }

  async findProductItemById(id: number) {
    const productItem = await this.db.findOneBy({ id });
    if (!productItem) {
      throw new Error('ProductItem not found');
    }
    return productItem;
  }

  async deleteProductItem(id: number) {
    const productItemToDelete = (await this.findProductItemById(id)) as ProductItem;
    await this.db.remove(productItemToDelete);
    return { id };
  }
}
