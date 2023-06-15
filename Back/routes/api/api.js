const router = require("express").Router()
const apiPeriod = require('./period')
const apiEvenement = require("./evenement")
const apiQuizz = require("./quizz")

router.use("/period", apiPeriod)
router.use("/evenement", apiEvenement)
router.use("/quizz", apiQuizz)

module.exports = router