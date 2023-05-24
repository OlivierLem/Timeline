const router = require("express").Router()
const apiPeriod = require('./period')

router.use("/period", apiPeriod)

module.exports = router