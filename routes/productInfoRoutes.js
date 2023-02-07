const express = require('express')
const router = express.Router()

const {getCO2Emissions} = require('../controllers/productInfoController')

router.get('/', (req, res) => {
    res.render('general/calc.ejs');
})

router.post('/', getCO2Emissions)

module.exports = router