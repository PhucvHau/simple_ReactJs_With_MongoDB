const router = require('express').Router()
const controller = require('../controllers/user.controller')


router.post("/",controller.create)
router.get("/", controller.getAllUser)
router.get("/:idCode", controller.getUser)
router.put("/:idCode", controller.updateAUser)

module.exports = router