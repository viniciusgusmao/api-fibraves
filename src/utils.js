module.exports = {
  validarCPF(strCPF) {  
    var strCPF = String(strCPF)
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;
     
    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  },
  validarTelefone(telefone){
    const res = new RegExp(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/);
    return res.test(String(telefone));
  },
  validarURL(url){
    const res = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return res.test(url);
  },
  validarEmail(email){
    const res = new RegExp(/\S+@\S+\.\S+/);
    return res.test(email);
  }
}