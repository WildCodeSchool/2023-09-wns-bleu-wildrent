import { execute } from '../../jest.setup';
import { Category } from '../entities/category.entity';
// import getAdminContext from './helpers/getAdminContext';
import getCategories from './operations/getCategories';
import getCategoryById from './operations/getCategoryById';

describe('Categories Resolver', () => {
  it('can get a list of categories', async () => {
    await Category.create({
      id: 1,
      name: 'Mobilier',
      description:
        'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
      image: 'https://www.highgest.fr/image/562535501368/1920/928/Les-petits-+.jpg',
    }).save();
    await Category.create({
      id: 2,
      name: 'Eclairage',
      description:
        'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
      image: 'https://www.highgest.fr/image/505818799390/1920/945/Les-petits-+.jpg',
    }).save();
    const res = await execute(getCategories);
    expect(res).toMatchSnapshot();
  });

  it('can get one category by id', async () => {
    const cat3 = await Category.create({
      name: 'Sonorisation',
      description: 'Description de la catégorie Sonorisation',
      image: 'https://exemple.com/image_sonorisation.jpg',
    }).save();
    const res = await execute(getCategoryById, { categoryId: cat3.id });
    expect(res).toMatchSnapshot();
  });

  // it('can create a tag', async () => {
  //   const res = await execute(
  //     addCategory,
  //     {
  //       data: {
  //         name: 'Bougie',
  //         description:
  //           'Oat cake biscuit cookie chocolate pudding. Fruitcake cake cupcake bonbon pudding tiramisu jelly beans marzipan. Shortbread dessert chocolate biscuit jelly-o brownie. Toffee tootsie roll lollipop jelly beans powder croissant pie. Sesame snaps jelly-o dessert sugar plum donut caramels chocolate. Bear claw macaroon brownie cookie icing jelly sugar plum.',
  //         image: 'https://www.highgest.fr/image/505818799390/1920/945/Les-petits-+.jpg',
  //       },
  //     },
  //     // await getAdminContext()
  //   );
  //   expect(res).toMatchSnapshot();
  // });
});
