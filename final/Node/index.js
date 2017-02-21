var builder = require('botbuilder');
var restify = require('restify');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var model = process.env.LUIS_MODEL;
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', intents);
intents.matches('None', '/none')
.matches('GetWeather', '/getWeather')
.matches('BookFlight', '/bookFlight')
.onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."))

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/none', function(session){
    session.send("No intent");
})

bot.dialog('/getWeather', function(session){
    //Add custom code here to implent get weather feature
    session.send("GetWeather intent");
})

bot.dialog('/bookFlight', function(session){
    //Add custom code here to implent book flight feature
    session.send("BookFlight intent");
})