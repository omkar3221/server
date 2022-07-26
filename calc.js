var http = require("http");
var m = require("./module")
var fs  = require("fs")
var url = require("url")
// var i = require("./input.html")

var server = http.createServer(function(req,resp){
    var q = url.parse(req.url,true)
    

    switch(q.pathname){

    case "/":
        resp.writeHeader(200,{"content-type":"text/html"})
        var fd = fs.createReadStream("./input.html")
        fd.pipe(resp);

        
    case "/submit_data":
        console.log(q.query.btn1)
        resp.writeHeader(200,{"content-type":"text/html"})
        switch (q.query.btn1){
            case "add":
                resp.writeHeader(200,{"content-type":"text/html"})
                ans = m.addition(q.query.n1,q.query.n2)
                resp.end("<h1> addition : "+ans)
                break;

            case "sub":
                resp.writeHeader(200,{"content-type":"text/html"})
                ans = m.subtraction(q.query.n1,q.query.n2)
                resp.end("<h1> subtraction : "+ans)
                break;

            case "add":
                resp.writeHeader(200,{"content-type":"text/html"})
                ans = m.addition(q.query.n1,q.query.n2)
                resp.end("<h1> addition : "+ans)
                break;
            case "mul":
                resp.writeHeader(200,{"content-type":"text/html"})
                ans = m.multiply(q.query.n1,q.query.n2)
                resp.end("<h1> multipication : "+ans)
                break;
            case "div":
                resp.writeHeader(200,{"content-type":"text/html"})
                ans = m.divide(q.query.n1,q.query.n2)
                resp.end("<h1> division : "+ans)
                break;

            case "sqr":
                resp.writeHeader(200,{"content-type":"text/html"})
                ans = m.square(q.query.n1,q.query.n2)
                resp.end("<h1> square : "+ans)
                break;
            case "sum":
                resp.writeHeader(200,{"content-type":"text/html"})
                ans = m.sum(q.query.n1,q.query.n2,3,5)
                resp.end("<h1> sum : "+ans)
                break;
        }
          

       
        }

})


server.listen(3000);
console.log("server is listening at port 3000")