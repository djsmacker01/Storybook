const express = require('express');
const router = express.Router();

//@des login/landing page
//@route GET/

router.get('/', (req, res) => { 
    res.send('Login')
})



module.exports = router