const router = require('express').Router();
router.get('/logout', (req, res, next) => {
    req.session.destroy((error) => {
            if (error) throw error;
            res.redirect('/index');
        })
        //res.render('index');
})
module.exports = router;