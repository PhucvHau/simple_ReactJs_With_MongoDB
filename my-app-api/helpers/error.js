class ErrorHandler extends Error {
	constructor(statusCode, message, messageCode = false) {
		super()
		this.statusCode = statusCode
		this.message = message
		this.messageCode = messageCode
	}
}
module.exports = ErrorHandler
