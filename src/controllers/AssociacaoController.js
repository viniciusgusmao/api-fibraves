const models = require("@models")

module.exports = {
  async store(req,res) {
    try {
      const { filename: imagem } = req.file;
      console.log(imagem);
      return res.status(200).json({ success: true })
    } catch(e){
      return res.status(403).json({ error: String(e)})
    }
  }
}