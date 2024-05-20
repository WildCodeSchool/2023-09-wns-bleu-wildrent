import db from './db';
import { ProductRef } from './entities/productRef.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subcategory.entity';
import User from './entities/user.entity';
import { ProductItem } from './entities/productItem.entity';

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`),
    ),
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`),
    ),
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const category1 = Category.create({
    name: 'Mobilier',
    description:
      'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
    image: 'https://www.highgest.fr/image/562535501368/1920/928/Les-petits-+.jpg',
  });
  await category1.save();

  const category2 = Category.create({
    name: 'Eclairage',
    description:
      'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
    image: 'https://www.highgest.fr/image/505818799390/1920/945/Les-petits-+.jpg',
  });
  await category2.save();

  const subCategory1 = SubCategory.create({
    name: 'Tables',
    description:
      'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
    image: 'https://www.highgest.fr/image/562535501368/1920/928/Les-petits-+.jpg',
    category: category1,
  });
  await subCategory1.save();

  const subCategory2 = SubCategory.create({
    name: 'Chaises',
    description:
      'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
    image: 'https://www.highgest.fr/image/505818799390/1920/945/Les-petits-+.jpg',
    category: category1,
  });
  await subCategory2.save();

  const subCategory3 = SubCategory.create({
    name: 'Guirlandes',
    description:
      'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
    image: 'https://www.highgest.fr/image/426494735503/1920/928/Les-petits-+.jpg',
    category: category2,
  });
  await subCategory3.save();

  const productRef1 = ProductRef.create({
    name: 'Chaise Pauline',
    description:
      'Toffee candy canes danish liquorice candy canes donut jujubes apple pie. Jujubes chocolate jujubes brownie bonbon sugar plum danish pie. Lollipop jelly-o gummi bears wafer dessert biscuit oat cake sweet roll. Topping icing brownie liquorice liquorice. Apple pie carrot cake croissant topping jelly-o chocolate cake pudding cupcake. Oat cake jelly beans toffee soufflé gingerbread cupcake. Pie dessert soufflé fruitcake danish. Fruitcake halvah tart ice cream cookie fruitcake shortbread.',
    image: 'https://www.highgest.fr/admin/storage/144852959826.jpg',
    priceHT: 10,
    subCategory: subCategory2,
  });
  await productRef1.save();

  const productRef2 = ProductRef.create({
    name: 'Chaise Médaillon',
    description:
      'Toffee candy canes danish liquorice candy canes donut jujubes apple pie. Jujubes chocolate jujubes brownie bonbon sugar plum danish pie. Lollipop jelly-o gummi bears wafer dessert biscuit oat cake sweet roll. Topping icing brownie liquorice liquorice. Apple pie carrot cake croissant topping jelly-o chocolate cake pudding cupcake. Oat cake jelly beans toffee soufflé gingerbread cupcake. Pie dessert soufflé fruitcake danish. Fruitcake halvah tart ice cream cookie fruitcake shortbread.',
    image: 'https://www.highgest.fr/admin/storage/209057119173.jpg',
    priceHT: 10,
    subCategory: subCategory2,
  });
  await productRef2.save();

  const productItem1 = ProductItem.create({
    productRef: productRef2,
  });
  await productItem1.save();
  const productItem2 = ProductItem.create({
    productRef: productRef2,
  });
  await productItem2.save();

  const admin = User.create({
    firstname: 'admin',
    lastname: 'WildRent',
    role: 'ADMIN',
    email: 'contact@wildrent.com',
    password: 'mdp',
    picture: 'https://i.pinimg.com/564x/81/51/9e/81519ee42129525ccbe5db410fd14a4b.jpg',
  });
  await admin.save();

  const customer = User.create({
    firstname: 'Bart',
    lastname: 'Simpson',
    email: 'moi@gmail.com',
    password: 'mdp',
    picture: 'https://anniversaire-celebrite.com/upload/250x333/bart-simpson-250.jpg',
  });
  await customer.save();

  await db.destroy();
}

main();
