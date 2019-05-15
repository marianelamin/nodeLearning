var http = require('http');
var moment = require('moment');

function serverCallback(req,res){
  console.log(Date());
  var open = moment().set({'hour':12, 'minute':0, 'second':0});
  var close = moment().set({'hour':13, 'minute':0, 'second':0});
  var date = moment();
  var data = 'Hello world.' + '\n' + 'Welcome to our page.' + '\n' + 'Now, it is ' + date.format('hh:mm') + '\n';
  data+= 'Our business hours is from '+open.format('hh:mm')+' to '+close.format('hh:mm')+'.';
  if (date.diff(open)>0)
  {
    if(date.diff(close)<0)
      data+='\n** We are open : true **';
    else
     data += '\n** We are closed, come back tomorrow **';
  }
  else
    data+= '\n** Please come back in '+ moment().from(open, true) +' **';
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('******** response is: *******\n'+data);}

http.createServer(serverCallback).listen(8081);
console.log('node is running on port 8081');
