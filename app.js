const http = require("http");
const fs = require("fs");

let mujCitac = 0;

function main(req, res) {
    console.log("url: " + req.url);
    if (req.url === "/") {
        let s = fs.readFileSync("index.html");
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(s);
    } else if (req.url === "/citac") {
        mujCitac++; //dtto mujCitac = mujCitac + 1;
        let obj = {};
        obj.citac = mujCitac;
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    } else if (req.url === "/citac/vynuluj") {
        mujCitac = 0;
        let obj = {};
        obj.citac = mujCitac;
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    } else {
        res.writeHead(404);
        res.end();
    }
}

let srv = http.createServer(main);
srv.listen(8080);

console.log("Server bezi na http://localhost:8080");
