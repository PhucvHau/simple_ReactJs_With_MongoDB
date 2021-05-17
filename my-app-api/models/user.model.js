const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema(
	{
		idCode: {
			type: String,
            require:true
		},
        name: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
            require:true
		},
        address:{
            type:String,
        },
        phone:{
            type:String
        },
        position:{
            type:String,
        },
        typeWork:{
            type:String
        }
	},
	{ timestamps: true }
)
module.exports = mongoose.model('users', schema)
