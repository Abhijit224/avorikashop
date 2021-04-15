const router = require('express').Router();
const User = require('../DatabaseModel/User');
const Category = require('../DatabaseModel/Category');
const Product = require('../DatabaseModel/Products');
const list = require('../Utility/demo');


router.get('/', (req, res) => {
    User.find({}, function(err, users) {
        Category.find({}, function(err, catlist) {
            Product.find({}, function(err, products) {
                res.render("index", {
                    user: users,
                    categories: catlist,
                    productlist: products,
                });
            })
        })
    })
});


module.exports = router;