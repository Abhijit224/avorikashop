const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
const User = require('../DatabaseModel/User');
const { check, validationResult } = require('express-validator');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', urlencodedParser, [
    check('fname', 'This first name must be 3+ character long')
    .exists()
    .isLength({ min: 3 }),
    check('email', 'Error in email')
    .exists(),
    check('mobile', 'must be in 10 digits')
    .isLength({ min: 10, max: 10 }),
    check('aadhar', 'must be 15 digits')
    .isLength({ min: 12, max: 12 }),

], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        res.render('register', {
            alert
        })
    } else {
        return res.status(422).jsonp(errors.array());
    }
    // User.findOne({
    //     UserEmail: req.body.email
    // }).then((currentUser) => {
    //     if (currentUser) {
    //         res.send('user already in database' + currentUser);
    //     } else {
    //         const f = req.body.pass;
    //         const hp = bcrypt.hashSync(f, 10);
    //         console.log(hp);
    //         new User({
    //             UserName: req.body.fname,
    //             UserLastName: req.body.lname,
    //             UserEmail: req.body.email,
    //             UserContact: req.body.mobile,
    //             CompanyName: req.body.company,
    //             UserAadhar: req.body.aadhar,
    //             UserGST: req.body.gst,
    //             UserAddress: req.body.address,
    //             UserPassword: hp,
    //             UserRole: req.body.selectRole,
    //             UserImage: req.file.path
    //         }).save().then((newUser) => {
    //             console.log('new user created..' + newUser);
    //             res.render('login');
    //             done(null, newUser);
    //         })
    //     }
    // }).catch();
})
module.exports = router;