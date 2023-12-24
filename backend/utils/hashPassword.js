const bcrypt = require('bcryptjs')

const hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

module.exports = hashPassword