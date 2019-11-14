require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  storage: process.env.DB_STORAGE,
  define: {
    timestamps: true,
    underscored: true
  },
  logging: false
}