const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

module.exports.hash = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
			if (err) reject(err)
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) reject(err)
				resolve(hash)
			})
		})
	})
}
