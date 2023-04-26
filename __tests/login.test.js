const axios = require("axios");

// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

describe("hooks", function () {
  const email = "test6@mail.ua";
  const password = "123456";
  const baseUrl = "http://127.0.0.1:3000";
  const urlLogin = "/api/users/login";

  test("Status code 200", async () => {
    console.log("Status code 200");

    const { status } = await axios.post(`${baseUrl}${urlLogin}`, {
      password,
      email,
    });

    expect(status).toBe(200);
  });

  test("Returnet tokken", async () => {
    console.log("Returnet tokken");

    const { data: response } = await axios.post(`${baseUrl}${urlLogin}`, {
      password,
      email,
    });

    expect(response.token).toBeTruthy();
  });

  test("Returnet object", async () => {
    console.log("Returnet object");

    const { data: response } = await axios.post(`${baseUrl}${urlLogin}`, {
      password,
      email,
    });

    expect(response.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
