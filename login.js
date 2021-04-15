const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../DatabaseModel/User');
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    var n = req.body.email;
    User.findOne({ UserEmail: n }).then((data) => {
        var hash = data.UserPassword;
        bcrypt.compare(req.body.password, hash, function(err, result) {
            if (result == true) {
                req.session.userinfo = data;
                res.redirect('/home');
            } else {
                res.redirect('/login');
            }
        })

    }).catch((error) => { console.log(error) })
});
module.exports = router;