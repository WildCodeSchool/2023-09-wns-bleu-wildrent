import { test, expect } from '@playwright/test';
import { hash } from 'argon2';
import User from '../../backend/src/entities/user.entity';

test('Login admin et user', async ({ page }) => {
  await page.goto('auth/register');
  const emailAdmin = 'contact@wildrent.com';
  const passwordAdmin = 'mdp';
  const hashedPasswordAdmin = await hash(passwordAdmin);
  const admin = new User();
  admin.email = emailAdmin;
  admin.password = hashedPasswordAdmin;
  await admin.save();

  // Naviguer vers la page de connexion
  await page.goto('http://localhost:3000/auth/login');

  // Remplir le formulaire de connexion admin
  await page.fill('input#email', 'contact@wildrent.com');
  await page.fill('input#password', 'mdp');

  // Cliquer sur le bouton de connexion
  await page.click('[data-test-id="login-button"]');

  // Vérifier la direction vers le / après la connexion et accès au Dashboard
  await expect(page).toHaveURL('http://localhost:3000');
  await page.click('[data-test-id="avatar"]');
  await page.click('[data-test-id="dashboard-id"]');
  await expect(page).toHaveURL('http://localhost:3000/admin');
  await page.click('[data-test-id="wildrent-id"]');

  // Se déconnecter
  await page.click('[data-test-id="avatar"]');
  await page.click('[data-test-id="logout-btn"]');

  // Vérifier la redirection vers la page de connexion
  await expect(page).toHaveURL('http://localhost:3000/auth/login');

  // Créer un utilisateur de test
  const emailUser = 'moi@gmail.com';
  const passwordUser = 'mdp';
  const hashedPasswordUSer = await hash(passwordUser);

  const user = new User(); // Créez une instance de l'entité User
  user.email = emailUser;
  user.password = hashedPasswordUSer; // Assurez-vous que 'password' correspond à un champ dans votre entité
  // Ajoutez d'autres champs requis si nécessaire
  await user.save();

  // Remplir le formulaire de connexion utilisateur
  await page.fill('input#email', 'moi@gmail.com');
  await page.fill('input#password', 'mdp');

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
  await expect(page).toHaveURL('http://localhost:3000/auth/login');
});
