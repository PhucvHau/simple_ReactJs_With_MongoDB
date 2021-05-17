
module.exports = (app) => {
	app.use('/', require('./routers/user.router'))
}
