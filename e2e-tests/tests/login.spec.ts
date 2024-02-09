import { test, expect } from '@playwright/test';

    test('Login admin et user', async ({ page }) => {
        // Naviguer vers la page de connexion
        await page.goto('http://localhost:3000/auth/login');

        // Remplir le formulaire de connexion admin
        await page.fill('input#email', 'contact@wildrent.com');
        await page.fill('input#password', 'mdp');

        // Cliquer sur le bouton de connexion
        await page.click('[data-test-id="login-button"]');

        // Vérifier la redirection vers la page admin après la connexion
        await expect(page).toHaveURL('http://localhost:3000/auth/login/admin');

        // Se déconnecter
        await page.click('[data-test-id="logout-button"]');

        // Vérifier la redirection vers la page de connexion
        await expect(page).toHaveURL('http://localhost:3000/auth/login');

        // Remplir le formulaire de connexion utilisateur
        await page.fill('input#email', 'moi@gmail.com');
        await page.fill('input#password', 'mdp');

        // Cliquer sur le bouton de connexion
        await page.click('[data-test-id="login-button"]');

        // Vérifier la redirection vers la page d'accueil après la connexion
        await expect(page).toHaveURL('http://localhost:3000/');

        // Se déconnecter
        await page.click('[data-test-id="logout-button"]');

        // Vérifier la redirection vers la page de connexion
        await expect(page).toHaveURL('http://localhost:3000/auth/login');
    });

