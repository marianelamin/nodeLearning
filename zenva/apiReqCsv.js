var http = require('http');
var request = require('request');
var fs = require('fs');
var csv = require('csv');

var request_body = undefined;
var html_content = undefined;

function createHtmlStringFromCsv(retrievedData){

    var div_starts = html_content.indexOf('<div>');
    var div_ends =  html_content.indexOf('</div>');
    var string_until_div = html_content.slice(0,div_starts+5);
    var string_from_div = html_content.slice(div_ends);


    var html_string = `<table>`;
    html_string += '<tr>';
    var i = 0;
    retrievedData[0].forEach( function(attribute){
        html_string += '<td>' + attribute + '</td>\n';
        // console.log(attribute+ ' - ' +(i++));
    });
    html_string += '</tr>';

    var data = retrievedData.slice(1);
    data.forEach(function(row){
        html_string += '<tr>';
        row.forEach(function(cell){
            html_string += '<td>' + cell + '</td>\n';
        });
        html_string += '</tr>';
    });

    html_string += `</table>`;
    return string_until_div + html_string + string_from_div;
}

request('https://www.data.brisbane.qld.gov.au/data/dataset/1e11bcdd-fab1-4ec5-b671-396fd1e6dd70/resource/3c972b8e-9340-4b6d-8c7b-2ed988aa3343/download/public-art-open-data-2018-10-22.csv', function (err,request_res, body){
    csv.parse( body, function(err, data){
        request_body = data;
    });
});


var port = 8088;

http.createServer(function(req, res){
    if(request_body && html_content){
        res.writeHead(200,{'content-type':'text/html'});
        res.end(createHtmlStringFromCsv(request_body));
    }
    else{
        res.writeHead(200,{'content-type':'text/plain'});
        res.end('Nothing retrieved yet');
    }
}).listen(port);

fs.readFile('./index.html', function(err, html){
    if (err){
        throw err;
    }
    else
    {
        html_content = html;
    }
});

console.log('apiReq.js listening on port ' +port);


