const express = require('express')
const router = express.Router()


router.get('/signup', (req, res) => {
    res.render('general/signup');
});
  
router.get('/login', (req, res) => {
    res.render('general/login');
});

module.exports = router