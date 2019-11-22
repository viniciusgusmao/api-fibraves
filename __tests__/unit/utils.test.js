const utils = require("@app/utils")

describe('Utils', () => {
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
    it("should return true to a valid phone number", () => {
      const tel1 = "(27) 9999-9999";
      const tel2 = "(27) 99999-9999";
      const tel3 = "27 9999-9999";
      const tel4 = "27 99999-9999";
      const tel5 = "9999-9999";
      const tel6 = "3231-9999";
      const result1 = utils.validarTelefone(tel1);
      expect(result1).toBeTruthy()
      const result2 = utils.validarTelefone(tel2);
      expect(result2).toBeTruthy()
      const result3 = utils.validarTelefone(tel3);
      expect(result3).toBeTruthy()
      const result4 = utils.validarTelefone(tel4);
      expect(result4).toBeTruthy()
      const result5 = utils.validarTelefone(tel5);
      expect(result5).toBeTruthy()
      const result6 = utils.validarTelefone(tel6);
      expect(result6).toBeTruthy()
    })
    it("should return false to a wrong phone number", () => {
      const tel = "(27) 9999-99";    
      const result = utils.validarTelefone(tel);
      expect(result).toBeFalsy()
    })
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
