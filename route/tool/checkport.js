const { tcpPingPort } = require("tcp-ping-port")
const dns = require('dns')
const options = { 
    socketTimeout: 11000, 
    dnsTimeout: 10000,
    dnsServers: ['8.8.8.8', '8.8.4.4'],  // google DNS
}

class TCPCheckPort{
    constructor(domain, port){
        this.domain = domain;
        this.port = port;
    }
    check = async () => {
        if((this.domain == "") || (this.port == "")){
            return;
        }
        var t1 = new Date();
        var ret = await tcpPingPort(this.domain, parseInt(this.port), options);
        var t2 = new Date();
        ret.timeCheck = t2.getTime() - t1.getTime();
        return ret;
    }
}

module.exports.TCPCheckPort = TCPCheckPort;