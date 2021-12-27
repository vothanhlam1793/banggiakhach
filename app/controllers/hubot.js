var fetch = require("node-fetch");
async function send_hubot(message, room){
    var res;
    try {
        res = await fetch("http://node.creta.work:1888/hubot/in", {
            method: "POST",
            body: JSON.stringify({
                room: room,
                message: message
            }),
            headers:{
                "Content-Type": "application/json"
            }
        });
        var d = await res.text();
        return d;
    } catch (e) {
        return "ERROR";
    }
}

async function t(){
    console.log(await send_hubot("Khở khỏng/", "tro_ly_giam_doc"));
}

module.exports.send = send_hubot;