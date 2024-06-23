const express = require('express');
const router = express.Router();

//@des login/landing page
//@route GET/

router.get('/', (req, res) => { 
    res.send('Login')
})

//@des  Dashboard
//@route GET/dashboard

router.get('/dashboard', (req, res) => { 
    res.send('Dashboard')
})


module.exports = router