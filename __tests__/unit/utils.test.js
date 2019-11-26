const utils = require("@app/utils")

describe.skip('Utils', () => {
  describe("Validar CPF", () => {
    it('should return true to a valid CPF', () => {
      const cpf = 12163793788;
      const result = utils.validarCPF(cpf);
      expect(result).toBeTruthy();
    })
    it('should return false to a wrong CPF', () => {
      const cpf = 12123793788;
      const result = utils.validarCPF(cpf);
      expect(result).toBeFalsy();
    })
  })
  describe("Validar Telefone", () => {
    it("should return true to a valid phone number", () => {
      const tel = "(27) 9999-9999";
      const result = utils.validarTelefone(tel);
      expect(result).toBeTruthy()
    })
    it("should return true to a valid phone number - format (27) 99999-9999", () => {
      const tel = "(27) 99999-9999";
      const result = utils.validarTelefone(tel);
      expect(result).toBeTruthy()
    })
    it("should return true to a valid phone number - format 27 9999-9999", () => {
      const tel = "27 9999-9999";
      const result = utils.validarTelefone(tel);
      expect(result).toBeTruthy()
    })
    it("should return true to a valid phone number - format 27 99999-9999", () => {
      const tel = "27 99999-9999";
      const result = utils.validarTelefone(tel);
      expect(result).toBeTruthy()
    })
    it("should return true to a valid phone number - format 9999-9999", () => {
      const tel = "9999-9999";
      const result = utils.validarTelefone(tel);
      expect(result).toBeTruthy()
    })
    it("should return true to a valid phone number - format 3231-9999", () => {
      const tel = "3231-9999";
      const result = utils.validarTelefone(tel);
      expect(result).toBeTruthy()
    })
    it("should return false to a wrong phone number", () => {
      const tel = "(27) 9999-99";    
      const result = utils.validarTelefone(tel);
      expect(result).toBeFalsy()
    })
  })
  describe("Validar E-mail", () => {
    it("should return true to a valid email", () => {
      const email = "vinicius-og@hotmail.com";
      const result = utils.validarEmail(email);
      expect(result).toBeTruthy()
    })
    it("should return false to a wrong email", () => {
      const email = "vinicius-og@hotmail";
      const result = utils.validarEmail(email);
      expect(result).toBeFalsy()
    })
  })
  describe("Validar URL", () => {
    it("should return true to a valid url", () => {
      const url = "https://tylermcginnis.com/validate-email-address-javascript/";
      const result = utils.validarURL(url);
      expect(result).toBeTruthy()
    })
    it("should return false to a wrong url - without .com", () => {
      const url = "https://tylermcginnis/validate-email-address-javascript/";
      const result = utils.validarURL(url);
      expect(result).toBeFalsy()
    })
    it("should return false to a wrong url - without .https", () => {
      const url = "tylermcginnis/validate-email-address-javascript/";
      const result = utils.validarURL(url);
      expect(result).toBeFalsy()
    })
  })
})
