const express = require('express')
const router = express.Router()

const generalController = require('../controllers/generalController.js')

router.get('/home', generalController.getHomePage)

router.post('/fetchData', generalController.fetchData)

module.exports = router