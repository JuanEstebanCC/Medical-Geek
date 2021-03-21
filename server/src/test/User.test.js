const req = require("supertest");
const faker = require("faker");
const { server, app } = require("../index");

// const api = supertest(app);

describe("Pruebas para la creación de usuarios", () => {
  it("Verificar la creación de un usuario tipo paciente", async () => {
    const res = await req(app).post(
      "/register".send({
        email: faker.internet.email(),
        full_name: faker.name.findName(),
        password: faker.internet.password(),
        specialization: faker.random.arrayElement([
          "General",
          "Cardiologist",
          "Ophthalmologist",
          "Optometrist",
        ]),
        usertype: 2,
      })
    );
    expect(res.statusCode).toEqual(200);
  });
});
