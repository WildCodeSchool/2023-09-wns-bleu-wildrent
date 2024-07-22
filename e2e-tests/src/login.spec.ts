import { test, expect } from '@playwright/test';
import { hash } from 'argon2';
import User from '../../backend/src/entities/user.entity';
import { connect, disconnect } from './dbHelpers';
import { clearDB } from '../../backend/src/db';
import nodemailer from 'nodemailer';
import { createTestAccount, getTestMessageUrl } from 'nodemailer';
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test('Login admin et user', async ({ page }) => {
  const emailAdmin = 'contact@wildrent.com';
  const passwordAdmin = 'mdp';
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
  await page.fill('input#password', 'mdp');

  // Cliquer sur le bouton de connexion
  await page.click('[data-test-id="login-button"]');

  // Vérifier la direction vers le / après la connexion et accès au Dashboard
  await expect(page).toHaveURL('http://localhost:3000/');
  await page.click("[data-test-id='avatar']");
  await page.click("[data-test-id='dashboard-id']");
  //await expect(page).toHaveURL('http://localhost:3000/admin');

  // Se déconnecter
  await page.goto('http://localhost:3000/');
  await page.click("[data-test-id='avatar']");
  await page.click("[data-test-id='logout-btn']");

  // Vérifier la redirection vers la page de connexion
  /*await page.goto('http://localhost:3000/');
  await page.click('[data-test-id="nav-login-button"]');
  await page.click('[data-test-id="register1-button"]');*/

  // Créer un utilisateur de test et envoyer un email de validation
  /*const testAccount = await createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // await page.click('[data-test-id="register1-button"]');


  const emailUser = `user${Math.random().toString(36).substring(7)}@example.com`;
  const passwordUser = 'password123';
  const roleUser = 'USER';

  // Simuler l'inscription de l'utilisateur
  const user = new User();
  user.email = emailUser;
  user.password = passwordUser;
  user.role = roleUser;
  user.emailConfirmationToken = randomBytes(20).toString('hex'); // Utilisation correcte de randomBytes
  await user.save();


  const confirmationLink = `http://localhost:3000/auth/emailConfirmation?token=${user.emailConfirmationToken}`;
  const info = await transporter.sendMail({
    from: 'contactwildrent@gmail.com',
    to: emailUser,
    subject: 'Bienvenue sur Wildrent',
    text: `Bienvenue parmi nous. Merci de bien vouloir cliquer sur ce lien pour confirmer votre email : ${confirmationLink}`,
  });

  // Remplir le formulaire de connexion utilisateur
  await page.fill('input#email', 'moi@gmail.com');
  await page.fill('input#password', 'mdp');


  const email = getTestMessageUrl(info);
  expect(email).toContain('Bienvenue parmi nous');

  // Extraire le lien de validation de l'email
  const validationLinkMatch = email.match(
    /http:\/\/localhost:3000\/auth\/emailConfirmation\?token=[a-zA-Z0-9-_]+/,
  );
  const validationLink = validationLinkMatch ? validationLinkMatch[0] : null;
  expect(validationLink).not.toBeNull();

  // Accéder au lien de validation
  await page.goto(validationLink);

  // Vérifier que la validation a réussi
  await expect(page.locator("text=Merci d'avoir confirmé votre email")).toBeVisible(); 

  // Connexion avec l'utilisateur validé
  await page.goto('http://localhost:3000/login');
  await page.fill('input#email', emailUser);
  await page.fill('input#password', passwordUser);
  await page.click('[data-test-id="login-button"]');*/

  // Vérifier la direction vers la page d'accueil et vérification de l'absence du Dashboard button
  /*await expect(page).toHaveURL('http://localhost:3000/');
  await page.click('[data-test-id="avatar"]');
  const dashboardIsVisible = await page.isVisible('[data-test-id="dashboard-id"]');
  expect(dashboardIsVisible).toBeFalsy();

  // Se déconnecter
  await page.click('[data-test-id="logout-btn"]');*/

  // Vérifier la redirection vers la page de connexion
  await expect(page).toHaveURL('http://localhost:3000/');
});
