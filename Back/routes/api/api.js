const router = require("express").Router()
const apiPeriod = require('./period')
const apiEvenement = require("./evenement")
const apiQuizz = require("./quizz")
const apiUser = require('./user')
const apiMailToken = require('./mailToken')
const apiAuth = require('./auth')

router.use('/user', apiUser)
router.use('/mailToken', apiMailToken)
router.use('/auth', apiAuth)
router.use("/period", apiPeriod)
router.use("/evenement", apiEvenement)
router.use("/quizz", apiQuizz)

module.exports = router