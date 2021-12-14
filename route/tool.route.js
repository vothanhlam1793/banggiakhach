var TCPCheckPort = require("./tool/checkport").TCPCheckPort;
// var Address4 = require('ip-address').Address4;

// var address = new Address6('2001:0:ce49:7601:e866:efff:62c3:fffe');

// var teredo = address.inspectTeredo();

// teredo.client4;    // '157.60.0.1'
module.exports = app => {
    var router = require("express").Router();
    router.get("/yourip", (req, res)=>{
        var ip = req.connection.remoteAddress.split(":");
        res.send({
            ip: ip[ip.length - 1],
            full: req.connection.remoteAddress
        })
    })
    router.get("/checkport", (req, res)=>{
        
        res.render("tool/checkport",{
            title: "Kiểm tra cổng"
        })
    })
    router.post("/checkport", async (req, res) => {
        console.log(req.body);
        if(req.body.domain && req.body.port){
            var t = new TCPCheckPort(req.body.domain, req.body.port);
            res.send(await t.check());
        } else {
            res.send({
                message: "Cannot check if DOMAIN and PORT empty"
            })
        }
    });
    router.get("/calchdd", (req, res)=>{
        
        res.render("tool/calhdd",{
            title: "Tính ổ cứng"
        })
    })
    app.use("/tool", router);
}