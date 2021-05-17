const { modelName } = require('../models/user.model');
const Model = require('../models/user.model');

module.exports.create = (req, res, next) =>{
    Model.create({
        idCode: req.body.idCode,
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        position: req.body.position,
        typeWork: req.body.typeWork,
      }, (err, data) => {
		if (err) {
			let message = _.flatMap(err.errors, (key, value) => {
				return { type: key, msg: value.message }
			})
			return next(new ErrorHandler(400, message))
		}
		res.status(200).json({ 
            errors: false,
            msg:"Create success full user"
        })
	})
}
module.exports.getUser = (req, res, next) =>{
    const {idCode} = req.params
    Model.find({idCode: idCode}, (err, data) =>{
        if(err) return next(new ErrorHandler(400,`Not find user with ${idCode}`))
        res.status(200).json({
            errors:false,
            msg:"get a user success full",
            content: data
        })
    }
    )
}

module.exports.getAllUser = (req, res, next) => {
    Model.find({}, (err, data) =>{
        if(err) return next(new ErrorHandler(400,`empty user in database`))
        res.status(200).json({
            errors:false,
            msg:"get all user success full",
            content: data
        })
    })
}

module.exports.updateAUser = (req, res, next) =>{
    const {idCode} = req.params
    Model.findOneAndUpdate({idCode: idCode}, {
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        position: req.body.position,
        typeWork: req.body.typeWork,
    }, (err, data) => {
        if(err) return next(new ErrorHandler(400,`Update user errors`))
        res.status(200).json({
            errors:false,
            msg:"Update user successfull",
            content: data
        })
    })
}