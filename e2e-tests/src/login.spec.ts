// import { expect, test } from "@playwright/test";
// import { connect, disconnect } from "./dbHelpers";
// import { hash } from "argon2";
// import User, { hashPassword } from "../../backend/src/entities/user.entity";
// import { clearDB } from "../../backend/src/db";

// test.beforeAll(connect);
// test.beforeEach(async () => {
//   await clearDB();
//   await createUser();
// });

// test.afterAll(disconnect);

// const email = "user@app.com";
// const password = "mysuperpassword";

// async function createUser() {
//   const hashedPassword = await hashPassword(password);
//   /*await User.create({ email, hashedPassword}).save();*/
// }

// test("can log in with correct credentials", async ({ page }) => {
//   await page.goto("/login");

//   const email = "dave.lopper@website.com";
//   const password = "1T!ESTINng";
//   const hashedPassword = await hash(password);
//   /*await User.create({ email, hashedPassword}).save();*/

//   await page.goto("/login");
//   await page.getByTestId("login-email").type(email);
//   await page.getByTestId("login-password").type(password);
//   await page.getByRole("button", { name: "Se Connecter" }).click();
//   // await expect(
//   //   page.getByRole("button", { name: "Se Déconnecter" })
//   // ).toBeVisible(); A redéfinir
// });
