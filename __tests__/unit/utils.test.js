const utils = require("@app/utils")

describe('Utils', () => {
  describe("Validar CPF", () => {
    it('should return true to a valid CPF', () => {
      const cpf = 12163793788;
      const result = utils.validarCPF(cpf);
      expect(result).toBeTruthy();
    })
    it('should return false to a valid CPF', () => {
      const cpf = 12123793788;
      const result = utils.validarCPF(cpf);
      expect(result).toBeFalsy();
    })
  })
})
