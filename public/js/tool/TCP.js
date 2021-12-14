class TCPCheck {
    constructor(){
        this.domain = "";
        this.port = "";
        this.result = [];
        this.onUpdateData = function(){};
    }
    setDomain = (domain) => {
        this.domain = domain;
    }
    setPort = (port) => {
        this.port = port;
    }
    check = (next) => {
        if((this.domain == "") || (this.port == "")){
            return;
        }
        var that = this;
        var id = (new Date()).getTime().toString()
        that.result.push({
            host: this.domain,
            port: this.port,
            online: "checking",
            timeCheck: 10000,
            id: id
        });
        $.post("/tool/checkport", {
            domain: this.domain,
            port: this.port
        }, function(d){
            that.result.forEach(function(res){
                if(res.id == id){
                    for (const [key, value] of Object.entries(d)) {
                        res[key] = value;
                    }
                }
            })
            that.onUpdateData();
            if(typeof next == "function"){
                next(d);
            }
        })
    }
}

class IP {
    constructor(){
        this.data = {}
        var that = this;
        $.get("/tool/yourip", (data) => {
            that.data = data;
        })
    }
    getIP = () => {
        return this.data.ip || "";
    }
}