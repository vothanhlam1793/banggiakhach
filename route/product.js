var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    if(req.query.pass != "asrkpvg7"){
        res.redirect("/");
    } else {
        res.render("product/index");
    }
})

// router.get("/create", function(req, res){
//     if(req.query.pass != "asrkpvg7"){
//         res.redirect("/");
//     } else {
//         res.render("product/index");
//     }
// })
module.exports = router;
