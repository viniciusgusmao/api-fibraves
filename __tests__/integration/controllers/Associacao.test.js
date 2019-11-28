const request = require("supertest");
const app = require("@app/app");
const path = require("path");

describe("Associacao", () => {
  it("POST /associacoes", async () => {
    const response = await request(app)
                              .post("/associacoes")
                              .field("nome", "Associacao teste")
                              .field("obs", "Vai porra")
                              .attach("imagem",path.resolve(__dirname,"..", "..", "example.jpg"))
    expect(response.statusCode).toBe(200);                              
  })
})