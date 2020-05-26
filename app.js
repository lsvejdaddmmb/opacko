const http = require("http");
const fs = require("fs");
const url = require("url");

let mujCitac = 0;
let jmeno = "???";

function main(req, res) {
    console.log("url: " + req.url);
    let q = url.parse(req.url, true);
    console.log("cesta: " + q.pathname);
    console.log("parametry: " + JSON.stringify(q.query));
    if (q.pathname === "/") {
        let s = fs.readFileSync("index.html");
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(s);
    } else if (q.pathname === "/citac") {
        mujCitac++; //dtto mujCitac = mujCitac + 1;
        let obj = {};
        obj.citac = mujCitac;
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    } else if (q.pathname === "/citac/vynuluj") {
        mujCitac = 0;
        let obj = {};
        obj.citac = mujCitac;
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    } else if (q.pathname === "/zapamatujsime") {
        jmeno = q.query.jmeno;
        let obj = {};
        obj.status = "zapamatovano!";
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    } else if (q.pathname === "/kohosipamatujes") {
        let obj = {};
        obj.zapamatovanejmeno = jmeno;
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
