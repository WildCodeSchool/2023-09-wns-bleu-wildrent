import db from './db';
import { ProductRef } from './entities/productRef.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subcategory.entity';
import User from './entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
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
    name: 'Furniture',
    description: 'Discover our range of elegant and comfortable furniture to enhance your events.',
    image:
      'https://cdn.prod.website-files.com/66210ac4723290084991bb2d/6670244f9229052f583f4105_location-mobilier-p-2000.jpg',
  });
  await category1.save();

  const category2 = Category.create({
    name: 'Lighting',
    description: 'Create a magical atmosphere with our selection of sophisticated lighting.',
    image:
      'https://cdn.prod.website-files.com/66210ac4723290084991bb2d/6671306f48047bf86aff323e_location-e%CC%81clairage-2-p-2000.jpg',
  });
  await category2.save();

  const category3 = Category.create({
    name: 'Tents and Structures',
    description: 'Tents and structures for all your events. Different models and sizes available.',
    image:
      'https://cdn.prod.website-files.com/66210ac4723290084991bb2d/666ffc9bbb91925f71062c59_location-tentes-%26-structures-p-2000.jpg',
  });
  await category3.save();

  const category4 = Category.create({
    name: 'Flooring',
    description: 'Flooring for all types of events.',
    image:
      'https://cdn.prod.website-files.com/66210ac4723290084991bb2d/667151ed674c2ead648239ce_location-revetements-2-p-2000.jpg',
  });
  await category4.save();

  const category5 = Category.create({
    name: 'Extras',
    description: 'Additional touches to personalize and enrich your events.',
    image:
      'https://cdn.prod.website-files.com/66210ac4723290084991bb2d/667174804b53f45948d1ba45_location-les-petits-plus-p-2000.jpg',
  });
  await category5.save();

  const subCategory1 = SubCategory.create({
    name: 'Chairs',
    description: 'Selection of elegant and comfortable chairs for all your events.',
    image:
      'https://cdn.prod.website-files.com/66210ac4723290084991bb2d/6656e1ae3f2fe6de062e9aea_location-chaises.png',
    category: category1,
  });
  await subCategory1.save();

  const subCategory2 = SubCategory.create({
    name: 'Outdoor Lighting',
    description: 'Outdoor lighting to create an enchanted atmosphere.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/666c4e9a981027cd67596587_location-guirlande-guinguette-16-p-1600.jpg',
    category: category2,
  });
  await subCategory2.save();

  const subCategory3 = SubCategory.create({
    name: 'Nomadic Tents',
    description: 'Elegant nomadic tents for outdoor events.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/66758e544e7d48e49bfda185_tente-nomade-rendu-3D-p-1600.png',
    category: category3,
  });
  await subCategory3.save();

  const subCategory4 = SubCategory.create({
    name: 'Dance Floors',
    description: 'Dance floors and other flooring for your events.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/66580ad62c1fbd921458b68e_location-plancher.png',
    category: category4,
  });
  await subCategory4.save();

  const subCategory5 = SubCategory.create({
    name: 'Parasols',
    description: 'Parasols to provide shade and comfort to your guests.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/665068d8db978a3c13163ef6_location-parasol-luxe.png',
    category: category5,
  });
  await subCategory5.save();

  const productRef1 = ProductRef.create({
    name: 'White Enora Chair',
    description: 'White Enora chair, elegant and comfortable, perfect for ceremonies.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/6670451a5514ddca379f8453_location-chaise-enora-blanche-3-p-1600.jpg',
    priceHT: 5,
    subCategory: subCategory1,
    quantity: 20,
  });
  await productRef1.save();

  const productRef2 = ProductRef.create({
    name: 'Camille Chair',
    description: 'Camille chair, modern design and comfortable seating for your receptions.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/66703ec20daf882e15bc6f4b_location-chaise-camille-9-p-1600.jpg',
    priceHT: 7,
    subCategory: subCategory1,
    quantity: 15,
  });
  await productRef2.save();

  const productRef3 = ProductRef.create({
    name: 'Guinguette Garland',
    description: 'Guinguette garland for a festive and warm atmosphere.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/666c4e36a7c0404a74c9a21a_location-guirlande-guinguette-15-p-1600.jpg',
    priceHT: 15,
    subCategory: subCategory2,
    quantity: 30,
  });
  await productRef3.save();

  const productRef4 = ProductRef.create({
    name: 'Balinese Chandeliers',
    description: 'Balinese chandeliers for an exotic and refined decoration.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/6674239ca1d73700263fa72c_location-lustres-balinais-9-p-1600.jpg',
    priceHT: 50,
    subCategory: subCategory2,
    quantity: 10,
  });
  await productRef4.save();

  const productRef5 = ProductRef.create({
    name: 'Nomadic Tent',
    description: 'Nomadic tent, ideal for outdoor events.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/666c55d6a8298fc5e8ac9b74_location-mariage-tente-nomade-7-p-1600.jpg',
    priceHT: 200,
    subCategory: subCategory3,
    quantity: 5,
  });
  await productRef5.save();

  const productRef6 = ProductRef.create({
    name: 'Glass Tent',
    description: 'Glass tent for a panoramic view.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/6670033bb89755bcfb1d90a5_location-tente-verriere-10-p-1600.jpg',
    priceHT: 300,
    subCategory: subCategory3,
    quantity: 3,
  });
  await productRef6.save();

  const productRef7 = ProductRef.create({
    name: 'Wooden Floor',
    description: 'Wooden floor for an elegant dance floor.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/66719020e665676c4a60917b_location-plancher-6-p-1600.jpg',
    priceHT: 150,
    subCategory: subCategory4,
    quantity: 7,
  });
  await productRef7.save();

  const productRef8 = ProductRef.create({
    name: 'Dance Floor',
    description: 'Dance floor for unforgettable nights.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/667191e49933816c67737bb4_location-piste-danse-mariage-1.JPG',
    priceHT: 500,
    subCategory: subCategory4,
    quantity: 2,
  });
  await productRef8.save();

  const productRef9 = ProductRef.create({
    name: 'Cyclades Parasol',
    description: 'Cyclades parasol, perfect for providing shade during your outdoor events.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/66728d9fa770f5d2b6462771_location-parasol-cyclades-4-p-1600.jpg',
    priceHT: 20,
    subCategory: subCategory5,
    quantity: 25,
  });
  await productRef9.save();

  const productRef10 = ProductRef.create({
    name: 'Heated Parasol',
    description: 'Heated parasol to ensure your guests’ comfort during chilly evenings.',
    image:
      'https://cdn.prod.website-files.com/66388acd39b527acd7346059/66545783c769f54b1c4f98a0_location-parasol-chauffant-2-p-1600.jpg',
    priceHT: 60,
    subCategory: subCategory5,
    quantity: 15,
  });
  await productRef10.save();

  // Create ProductItem for the new products
  const newProducts = [
    productRef1,
    productRef2,
    productRef3,
    productRef4,
    productRef5,
    productRef6,
    productRef7,
    productRef8,
    productRef9,
    productRef10,
  ];

  for (const productRef of newProducts) {
    for (let i = 0; i < productRef.quantity; i++) {
      const productItem = ProductItem.create({
        productRef,
      });
      await productItem.save();
    }
  }

  const admin = User.create({
    firstname: 'admin',
    lastname: 'WildRent',
    role: 'ADMIN',
    email: 'contact@wildrent.com',
    password: 'mdp',
    picture:
      'https://www.lemazetroucas.fr/wp-content/uploads/2024/06/Gray-Circle-Leaf-Wedding-Event-Planner-Logo-1.png',
  });
  await admin.save();

  const customer1 = User.create({
    firstname: 'Bart',
    lastname: 'Simpson',
    email: 'moi@gmail.com',
    password: 'mdp',
    picture: 'https://anniversaire-celebrite.com/upload/250x333/bart-simpson-250.jpg',
  });
  await customer1.save();
  const customer2 = User.create({
    firstname: 'Marge',
    lastname: 'Simpson',
    email: 'marge@gmail.com',
    password: 'mdp',
    picture: 'https://anniversaire-celebrite.com/upload/250x333/marge-simpson-250.jpg',
  });
  await customer2.save();

  const order1 = Order.create({
    user: customer1,
    orderDate: new Date(),
    startDate: new Date('2024-06-14'),
    endDate: new Date('2024-06-16'),
    shippingAddress: '742 Evergreen Terrace, Springfield',
  });

  const productItem1 = ProductItem.create({ productRef: productRef1 });
  await productItem1.save();

  const productItem2 = ProductItem.create({ productRef: productRef2 });
  await productItem2.save();
  await order1.save();
  const order2 = Order.create({
    user: customer1,
    orderDate: new Date(),
    startDate: new Date('2024-06-25'),
    endDate: new Date('2024-06-30'),
    shippingAddress: '742 Evergreen Terrace, Springfield',
  });
  await order2.save();

  const order1Item1 = OrderItem.create({
    order: order1,
    productItems: [productItem1],
    quantity: 1,
    unitPrice: 10,
  });
  await order1Item1.save();
  const order1Item2 = OrderItem.create({
    order: order1,
    productItems: [productItem2],

    quantity: 1,
    unitPrice: 10,
  });
  await order1Item2.save();

  const order2Item1 = OrderItem.create({
    order: order2,
    productItems: [productItem2],

    quantity: 16,
    unitPrice: 10,
  });
  await order2Item1.save();

  order1.orderItems = [order1Item1, order1Item2];
  order2.orderItems = [order2Item1];

  order1.calculateTotalAmount();
  order2.calculateTotalAmount();
  await order1.save();
  await order2.save();

  await db.destroy();
}

main();
