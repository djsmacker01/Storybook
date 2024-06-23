const express = require('express');
const router = express.Router();

//@des login/landing page
//@route GET/

router.get('/', (req, res) => { 
    res.render('login')
})

//@des  Dashboard
//@route GET/dashboard

router.get('/dashboard', (req, res) => { 
    res.render('dashboard')
})


module.exports = router