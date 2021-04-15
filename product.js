const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const { db } = require('../DatabaseModel/Category');
// const Category = require('../DatabaseModel/Category');
// const Product = require('../DatabaseModel/Products');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploaedProducts/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/product', (req, res) => {

})
router.post('/product', upload.single('productImage'), (req, res) => {
    Product = {
        ProductName: req.body.productname,
        ProductDescription: req.body.productdescription,
        ProductCategory: req.body.selectcategory,
        ProductPrice: req.body.productprice,
        ProductDiscount: req.body.productdiscount,
        ProductImage: req.file.path
    }

    console.log(Product)
})
console.log("abhijit")



module.exports = router;