module.exports.auth = {
  bcrypt: {
    rounds: 10
  },
  jwt: {
    secret: null,
    expiresIn: '24h'
  }
};