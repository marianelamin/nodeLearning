var http = require('http');
var request = require('request');
var fs = require('fs');


var request_body = undefined;
var html_content = undefined;

function createHtmlStringFromJson(retrievedData){

    var div_starts = html_content.indexOf('<div>');
    var div_ends =  html_content.indexOf('</div>');
    var string_until_div = html_content.slice(0,div_starts+5);
    var string_from_div = html_content.slice(div_ends);


    var html_string = `<table>`;
    html_string += '<tr>';
    for(var attribute in retrievedData[0]){
        if(typeof retrievedData[0][attribute] !== 'object'){
            html_string += '<td>' + attribute + '</td>\n';
        }
    }
    html_string += '</tr>';

    retrievedData.forEach(function(object){
        html_string += '<tr>';
        for(var attribute in object){
            if(typeof object[attribute] !== 'object'){
                html_string += '<td>' + object[attribute] + '</td>\n';
            }
        }
        html_string += '</tr>';
    });

    html_string += `</table>`;
    return string_until_div + html_string + string_from_div;
}

request('https://www.bnefoodtrucks.com.au/api/1/trucks', function (err,request_res, body){
    request_body = body;
});

http.createServer(function(req, res){
    if(request_body && html_content){
        res.writeHead(200,{'content-type':'text/html'});
        res.end(createHtmlStringFromJson(JSON.parse(request_body)));
    }
    else{
        res.writeHead(200,{'content-type':'text/plain'});
        res.end('Nothing retrieved yet');
    }
}).listen(8080);

fs.readFile('./index.html', function(err, html){
    if (err){
        throw err;
    }
    else
    {
        html_content = html;
    }
});