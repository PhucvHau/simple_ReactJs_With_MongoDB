const mongoose = require('mongoose')
mongoose.Promise = Promise
var mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(
	'mongodb+srv://doankhoa:doankhoa2020@doankhoa.f4tyb.mongodb.net/test',
	// 'mongodb://localhost:27017/doankhoa',
	mongooseOptions,
	function (err) {
		if (err) console.error('System could not connect to mongo server.')
	}
)
