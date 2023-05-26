const router = require("express").Router()
const apiPeriod = require('./period')
const apiEvenement = require("./evenement")

router.use("/period", apiPeriod)
router.use("/evenement", apiEvenement)

module.exports = router