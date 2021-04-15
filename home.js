const router = require('express').Router();
const Category = require('../DatabaseModel/Category');
const Product = require('../DatabaseModel/Products');
router.get("/home", async(req, res) => {
    var u = req.session.userinfo;
    if (u == null) {
        res.render('login');
    } else {
        // console.log("From Home Js..." + u.UserEmail)
        await Category.find({}, function(err, catlist) {
            Product.find({}, function(err, products) {
                res.render("home", {
                    user: u,
                    categories: catlist,
                    productlist: products,
                });
            })
        })

    }
});
module.exports = router;