import { test, expect } from '@playwright/test';
import User from '../../backend/src/entities/user.entity';
import { connect, disconnect } from './dbHelpers';
import { clearDB } from '../../backend/src/db';

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test('Login admin et user', async ({ page }) => {
  const emailAdmin = 'contact@wildrent.com';
  const passwordAdmin = 'mdp123';
  const roleAdmin = 'ADMIN';
  // const hashedPasswordAdmin = await hash(passwordAdmin);
  const admin = new User();
  admin.email = emailAdmin;
  admin.password = passwordAdmin;
  admin.role = roleAdmin;
  await admin.save();

  // Naviguer vers la page de connexion

  await page.goto('http://localhost:3000/');
  await page.click('[data-test-id="nav-login-button"]');
  // Remplir le formulaire de connexion admin
  await page.fill('input#email', 'contact@wildrent.com');
  await page.fill('input#password', 'mdp123');

  // Cliquer sur le bouton de connexion
  await page.click('[data-test-id="login-button"]');

  // Vérifier la direction vers le / après la connexion et accès au Dashboard
  await expect(page).toHaveURL('http://localhost:3000/');
  await page.click("[data-test-id='avatar']");
  await page.click("[data-test-id='dashboard-id']");
  await expect(page).toHaveURL('http://localhost:3000/admin');

  // Se déconnecter
  await page.goto('http://localhost:3000/');
  await page.click("[data-test-id='avatar']");
  await page.click("[data-test-id='logout-btn']");

  // Vérifier la redirection vers la page de connexion
  await page.goto('http://localhost:3000/');
  await page.click('[data-test-id="nav-login-button"]');
  // await page.click('[data-test-id="register1-button"]');

  // Créer un utilisateur de test
  const emailUser = 'moi@gmail.com';
  const passwordUser = 'mdp123';
  const roleUser = 'USER';
  // const hashedPasswordUSer = await hash(passwordUser);

  const user = new User();
  user.email = emailUser;
  user.password = passwordUser;
  user.role = roleUser;
  await user.save();

  // Remplir le formulaire de connexion utilisateur
  await page.fill('input#email', 'moi@gmail.com');
  await page.fill('input#password', 'mdp123');

  // Cliquer sur le bouton de connexion
  await page.click('[data-test-id="login-button"]');

  // Vérifier la direction vers la page d'accueil et vérification de l'absence du Dashboard button
  await expect(page).toHaveURL('http://localhost:3000/');
  await page.click('[data-test-id="avatar"]');
  const dashboardIsVisible = await page.isVisible('[data-test-id="dashboard-id"]');
  expect(dashboardIsVisible).toBeFalsy();

  // Se déconnecter
  await page.click('[data-test-id="logout-btn"]');

  // Vérifier la redirection vers la page de connexion
  await expect(page).toHaveURL('http://localhost:3000/');
});
