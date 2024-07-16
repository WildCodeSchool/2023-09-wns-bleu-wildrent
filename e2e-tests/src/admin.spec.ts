// import { test, expect } from '@playwright/test';
// import User from '../../backend/src/entities/user.entity';
// import { connect, disconnect } from './dbHelpers';

// test.beforeAll(connect);
// test.afterAll(disconnect);

// test('Admin interactions', async ({ page }) => {
//   const admin = new User();
//   admin.email = 'admin@email.com';
//   admin.password = 'password';
//   admin.role = 'ADMIN';
//   await admin.save();

//   page.on('dialog', async (dialog) => {
//     dialog.accept();
//   });

//   await page.goto('http://localhost:3000/');
//   await page.click('[data-test-id="nav-login-button"]');
//   // Remplir le formulaire de connexion admin
//   await page.fill('input#email', 'admin@email.com');
//   await page.fill('input#password', 'password');

//   // Cliquer sur le bouton de connexion
//   await page.click('[data-test-id="login-button"]');

//   // Une fois sur le dashboard admin accès à la gestion des utilisateurs
//   await page.goto('http://localhost:3000/admin/users');
//   await page.click('[data-test-id="add_btn"]');

//   // Create new user
//   const testUserEmail = 'test@email.com';
//   const testUserPassword = 'test';
//   await page.fill('input#email', testUserEmail);
//   await page.fill('input#password', testUserPassword);
//   await page.click("[form='modalForm']");

//   const userCreated = page.isVisible(`[data-test-value="${testUserEmail}"]`);
//   expect(userCreated).toBeTruthy();

//   // Edit user
//   await page.click(`[data-test-value="${testUserEmail}"] + [data-test-id="edit_btn"]`);
//   await page.fill('input#firstname', 'John');
//   await page.fill('input#lastname', 'Doe');
//   await page.click("button[form='modalForm']");

//   const userEdited =
//     page.isVisible(`[data-test-value="${testUserEmail}"] + [data-test-value="John"]`) &&
//     page.isVisible(`[data-test-value="${testUserEmail}"] + [data-test-value="Doe"]`);

//   expect(userEdited).toBeTruthy();

//   // Edit user
//   await page.click(`[data-test-value="${testUserEmail}"] + [data-test-id="delete_btn"]`);

//   const userDeleted = page.isVisible(`[data-test-value="${testUserEmail}"]`);

//   expect(userDeleted).toBeFalsy();

//   // Se déconnecter
//   await page.goto('http://localhost:3000/');
//   await page.click("[data-test-id='avatar']");
//   await page.click("[data-test-id='logout-btn']");
// });
