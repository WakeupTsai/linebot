var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var linebot = require('linebot');
var express = require('express');
const line = require('@line/bot-sdk');

var bot = linebot({
  channelId: "1531696179",
  channelSecret: "f3dfd89d5534161ef2aca6dae7c04be0",
  channelAccessToken: "W7lMYwD9YJBRZLVSHKoJmIQThb13+EP1srUaDT00cDNxjtdLEtjS5BVQDIi3twoSvPfqkvAJV1yzUNaNIkTIbOJp3tuaL7aDQBZ6oofgEVYUwEesS7nWRpvrepjaCieXjVIWk4Rw1bSCNnUmHQ1nogdB04t89/1O/w1cDnyilFU="
});

const client = new line.Client({
  channelAccessToken: "W7lMYwD9YJBRZLVSHKoJmIQThb13+EP1srUaDT00cDNxjtdLEtjS5BVQDIi3twoSvPfqkvAJV1yzUNaNIkTIbOJp3tuaL7aDQBZ6oofgEVYUwEesS7nWRpvrepjaCieXjVIWk4Rw1bSCNnUmHQ1nogdB04t89/1O/w1cDnyilFU="
});

var ruleClient = new XMLHttpRequest();


bot.on('message', function(event) {
  console.log(event);
  if (event.message.type = 'text') {
    var msg = event.message.text;
    if ( msg == '點名') {
      client.getProfile(event.source.userId)
        .then((profile) => {
          event.reply( profile.displayName+"，點名成功。").then(function(data) {
          // success
          console.log(msg);
        }).catch(function(error) {
          // error
          console.log('error');
        });

      })
        
    }
    else if ( msg == '規則') {
      ruleClient.open('GET', '/rule.txt');
      ruleClient.onreadystatechange = function() {
        console.log(ruleClient.responseText);
      }
    }
    else {
      event.reply(msg).then(function(data) {
        // success 
        console.log(msg);
      }).catch(function(error) {
        // error 
        console.log('error');
      });
    }
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
