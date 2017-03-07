# Microsoft Bot Framework Workshop

## Overview
Microsoft Bot Framework is a comprehensive offering to build and deploy high quality bots for your users to enjoy in their favorite conversation experiences. Developers writing bots all face the same problems: bots require basic I/O; they must have language and dialog skills; they must be performant, responsive and scalable; and they must connect to users – ideally in any conversation experience and language the user chooses. Bot Framework provides just what you need to build, connect, manage and publish intelligent bots that interact naturally wherever your users are talking – from text/sms to Skype, Slack, Facebook Messenger, Kik, Office 365 mail and other popular services. This lab will show you how to build a basic bot, connect it to a LUIS model, and get responses back.  

### Objectives
This lab will show you how to:
- Create an echo chat Bot
- Create a LUIS model
- Integrate a LUIS model into an existing Bot
- Use the Bot Freamwork Emulator to test your Bot

### System Requirements
You must have the following to complete this lab:
- Microsoft Visual Studio (latest update) 
- Bot Framework Emulator
- Bot Application Template (if using Windows)

## Contents
EXERCISE 1: CREATE A BOT
- [Register a Bot](#register-a-bot)
- Create a new Bot Application
    - [In C#](#create-a-new-bot-application-in-csharp)
    - [In Node](#create-a-new-bot-application-in-node)
- [Using the Bot Emulator](#using-the-bot-emulator)

EXERCISE 2: ADD A LUIS MODEL
- [Create a LUIS Application](#create-a-luis-application)
- [Adding Intents](#adding-intents)

EXERCISE 3: CONNECTING THE DOTS
- [In C#](#connecting-to-luis-in-csharp)
- [In Node](#connecting-to-luis-in-node)

[Additional Resources](#additional-resources)

[Credit](#credit)

## Setup
You must perform the following steps to prepare your computer for this lab:

First, install the [Bot Framework Emulator](https://aka.ms/bf-bc-emulator).

### C# (Windows 10)
1.	Install [Visual Studio 2015](https://www.visualstudio.com/vs/community)
    -  Update all VS extensions to their latest versions
2.	Install the [Bot Application Template](http://aka.ms/bf-bc-vstemplate)
    - Save in your VS template directory `%USERPROFILE%\Documents\Visual Studio 2015\Templates\ProjectTemplates\Visual C#`

### C# (Mac)
1.	Install [Visual Studio for Mac Preview](https://www.visualstudio.com/vs/visual-studio-mac)
2.	Download the `MyFirstBot` project from this [workshops GitHub repo](https://github.com/liliankasem/bot-workshop/tree/master/MyFirstBot)

### Node
Install [Node JS](https://nodejs.org/en/)


## EXERCISE 1: CREATE A BOT

### Register a Bot
Before we begin, we need to register a new bot on the bot framework website.

1. Go to https://dev.botframework.com/  and click “Register a bot” at the top of the screen. 

    ![Register](images/register1.png)

2. Give your bot a name, a bot handle, and give it a small description.

    ![Register](images/register2.png)

3. In the Configuration section, click “Create Microsoft App ID and password”. On the next page, your App ID will be displayed (write this down). 

    ![Register](images/register3.png)

4. Click “Generate a password to continue”. Write down this password and keep it safe!  This is the only time the password will be displayed! Click “Ok” and then click “Finish and go back to Bot Framework” 

    ![Register](images/register4.png)

    ![Register](images/register5.png)

5. Fill out the rest of the required fields. Then click “Register”. 

### Create a new Bot Application in CSharp
If you are doing this lab on a MacBook (OSX): as currently there isn't a Bot Framework template for Visual Studio Mac, use the `MyFirstBot` project as your starting application for developing a C# bot on OSX. This application is exactly the same result you would get if you follow the steps below on Windows.

1. In a new instance of Visual Studio 2015, choose **File > New> Project** to open the New Project dialog. Navigate to **Installed > Templates > Visual C#** and select the **Bot Application** template.
 
    Name your project **MyFirstBot** and select the file system location where you will save your solutions. Leave the options selected to **Create new solution** and **Create directory for solution**.

    ![Create a new bot](images/csharpbot1.png)

2. Set your Solution Configuration to **Debug** and your Solution Platform to **Any CPU**. Select your favorite browser from the Debug Target dropdown menu. You can choose to debug/deploy on a phone device connected via USB outside of this lab.

    ![Create a new bot](images/csharpbot2.png)

3. Build and run your app. You will see a blank app browser tab displaying the applications Default.htm

    ![Create a new bot](images/csharpbot3.png)

    **Keep note of the port your Bot is running on as well as the API URL to be used for testing your Bot. In this case, this is `http://localhost:3978/api/messages`**

### If you are doing this on a Macbook (OSX): 
When the application launches, you may see a 404 Error `System.Web.HttpException. The resource cannot be found`. Don't worry about this for now as the application still works and this doesn't prevent you from completing the lab.

Also notice your app is using port 8080. Keep a note of this as you will need to use this address in the bot emulator to communicate with your bot: `http://localhost:8080/api/messages`


### Create a new Bot Application in Node

1. Make sure you have Node JS install (link provided in setup section) 
2. Open terminal or command prompt
3. Make a new directory (the location you will store your bot application) and then change directory into that folder
    - In this case, I've created a new dicrecotry 'myfirstbot' in my Documents

    ![Create a new bot](images/nodebot1.png)

4. Run `npm init` and fill out the fields. Generally, you can just hit enter all the way through. This will create an empty node project.

    ![Create a new bot](images/nodebot2.png)

5. Run `npm install --save restify`. This will download the restify package required and save the dependacy to the `package.json` file. Restify is required as we need a server to listen for messages at a given port.

6. Open this project in your favourite IDE and you should be able to see the following structure and package.json should also show the dependencies we just installed.

    ![Create a new bot](images/nodebot3.png)


7. Create a new file called `index.js` and paste the following code into it:

    ```javascript
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

    //=========================================================
    // Bots Dialogs
    //=========================================================

    bot.dialog('/', function(session){
        session.send("You sent %s which was %d characters", session.message.text, session.message.text.length);
    })
    ```

8. Build and run this project. You can do this in terminal or command promptt by calling `node index.js` and you should see the bot running at port t `3978`. The endpoint you need to communicate to your bo will be `http://localhost:3978/api/messages`

    ![Create a new bot](images/nodebot4.png)

### Using the Bot Emulator

1. Keep your bot application running from the previous steps and make a note of the endpoint
    - If you've already closed the application, run your bot application again
    - Depending on which steps you followed, you endpoint should be `http://localhost:3978/api/messages` or `http://localhost:8080/api/messages`

2. Open the Bot Emulator and enter your endpoint where it says "Enter your endpoint URL"

    ![Emulator](images/emulator1.png)

3. You should then see the same configuration settings as the image below. We go these details from the portol in Task 1. For now you can leave these blank and just press "Connect". If you type a message now, you should see your bot in action.

    ![Emulator](images/emulator2.png)

    ![Emulator](images/emulator3.png)

### Bonus
Remember these settings?

![Emulator](images/emulator2.png)

You can fill these fields in with the values we got when we registered our bot in Task 1. You will need to do this when you start live debugging with ngrok (you can find out more about this from the [documentation](https://docs.botframework.com/en-us/node/builder/guides/core-concepts/#debugging-locally-using-ngrok)). To do that, first you have to update your application with the App ID and Password too.

1. In C#, open `Web.config` and replace the `AppId` and `AppPassword` with the correct values from your [bot developer portal](https://dev.botframework.com/)

    ![Bot ID & Password](images/appid1.png)

2. In Node, if your IDE supports environment variables you can use that as a way of setting the `AppId` and `AppPassword` (as shown in image 1). Otherwise, just replace the values in index.js (as shown in image 2).

    ![Bot ID & Password](images/appid2.png)

    ![Bot ID & Password](images/appid3.png)

3. Finally, you will need to update your bot's endpoint in the [bot developer portal](https://dev.botframework.com/)
    - NB: you only need to do this if you have deployed your bot to a web service or if you are using ngrok. This will not work with localhost

    ![Register](images/register6.png)

## EXERCISE 2: ADD A LUIS MODEL

### Create a LUIS Application

1.	Go to [luis.ai](https://luis.ai) and log in. 
2.	Click "My apps” in the top menu bar and click “New App".

    ![LUIS](images/luis1.png)

3. In the pop up: name your new LUIS model, give it a description, and choose the application culture. Click "Create”. 

    ![LUIS](images/luis2.png)

4. When your application is finished provisioning, it will take you to the main page of your new LUIS model. Next, you will train your LUIS model.

### Adding Intents
Next, we will add two intents to the application.  

1. Navigate to the "Intents" page through the left hand menu then click the “Add Intent” button and make a “BookFlight” intent (name it “BookFlight”)

    ![LUIS](images/luis3.png)

2. Add an utterance to the "BookFlight" intent, for example "Book flight to Paris”, then click "Save".

    ![LUIS](images/luis4.png)


3. Now following the same steps as above: add a second intent called “GetWeather”, add the utterance “How is the weather in London”, then click “Save”. 

### Defining entities/Hierarchical entities 
You can have the ability to define relationships between entities based on hereditary hierarchical patterns. The generic entity acts as the parent and the children are the specific types/sub groups under the parent, yet both share the same characteristics. An example of this could be our Location.

1.	To add entities, navigate to the "Entities" tab through the left side menu and click the “Add custom entity” button.

    ![LUIS](images/luis5.png)

2.	Name the entity "Location" and select the entity type “Hierarchical”.
3.  Click "+ Add Child".
3.	Name the first child entity “ToLocation”.
4.	Next, click “+ Add Child” again and name the second child entity “FromLocation”.   
5.	When finished, click “Save”. 

    ![LUIS](images/luis6.png)

### Using Pre-Built Entities 
Next, we are going to add a Pre-Built datetime entity. 

1.	To add a Pre-Built Entity, click “Add prebuilt entity”

    ![LUIS](images/luis7.png)

2.	Tick the “datetime” checkbox from the list of Pre-Built entities.
3.	Then click “Save”

    ![LUIS](images/luis8.png)

### Training your model
Now that we have the intents and entities defined, we now need to provide more examples of utterances that illustrate these concepts. Navigate back to the "Intents" page through the left side menu.

Select an intent you have created, click the text box at the top of the screen and start typing in example utterances. You will need to input and label at least 10 examples of each intent in order to get an accurate model, then "Save". The images below show how the "BookFlight" utterances were labeled. 

![LUIS](images/luis9.png)

![LUIS](images/luis10.png)

![LUIS](images/luis11.png)


Do the same as above for the "GetWeather" intent. (Notice how in the image below we only set the label for the locations as "Location" and not the children such as "Location::ToLocation", we don't need the child entities in the "GetWeather" scenario).

![LUIS](images/luis12.png)

Next, navigate to “Train & Test” page through the side menu, and click "Train Application".

![LUIS](images/luis13.png)

Once the training has finished, navigate to the "Publish App" page, select your "Endpoint key", select an "Endpoint slot" and click "Publish". If you don't have an endpoint key, follow the steps provided when you click on the "Add a new key to your account" link.

![LUIS](images/luis14.png)

When published, a URL will appear with your application ID and your subscription key (endpoint key). Write these down and keep them safe. You will be using these later.

![LUIS](images/luis15.png) 

Now it’s time to connect the dots. 

## EXERCISE 3: CONNECTING THE DOTS
This next section will show you how to connect all the dots together and get your bot to recognize utterances entered into the bot emulator.  

### Connecting to LUIS in CSharp

1. Go back to the echo bot you made earlier. Add a new folder and name it “TravelApp”. Inside that new file, add a new class named “LUISApp”. This is where the code for your LUIS model will live. 

2. Next, we need to add code that will handle LUIS intents that are triggered from phrases entered into the Bot Emulator. Insert the following code snippet into the LUISApp file. 

    ```csharp
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Bot.Builder.Dialogs;
    using Microsoft.Bot.Builder.Luis;
    using Microsoft.Bot.Builder.Luis.Models;

    namespace MyFirstBot.TravelApp
    {
        [LuisModel("LUIS App ID", "Subscription Key")]
        [Serializable]
        public class LUISApp : LuisDialog<object>
        {
            //Will run when a None intent is Triggered
            [LuisIntent("")]
            public async Task None(IDialogContext context, LuisResult result)
            {
                //Add Custom code here.
                string message = $"No Intent";
                await context.PostAsync(message);
                context.Wait(MessageReceived);
            }

            //Will run when a GetWeather intent is Triggered
            [LuisIntent("GetWeather")]
            public async Task GetWeather(IDialogContext context, LuisResult result)
            {
                //Add Custom code here.
                string message = $"GetWeather Intent";
                await context.PostAsync(message);
                context.Wait(MessageReceived);
            }
            
            //Will run when a Bookflight intent is Triggered
            [LuisIntent("BookFlight")]
            public async Task BookFlight(IDialogContext context, LuisResult result)
            {
                //Add Custom code here.
                string message = $"BookFlight Intent";
                await context.PostAsync(message);
                context.Wait(MessageReceived);
            }
        }
    }
    ```
3. Input your App ID and Subscription Key from your LUIS model. 

4. Next we need to edit the `MessageController.cs` file and replace the ```Post``` method with the following:

    ```csharp
    public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
    {
        if (activity.Type == ActivityTypes.Message){
            await Conversation.SendAsync(activity, () => new LUISApp());
        }

        var response = Request.CreateResponse(HttpStatusCode.OK);
        return response;
    }
    ```
    
    Also make sure the following are imported:
    
    ```csharp
    using Microsoft.Bot.Builder.Dialogs;
    using MyFirstBot.TravelApp;
    ```
    
5. Rebuild your code and run it. 

6. Go to the bot emulator and start entering test queries. When an intent of “GetWeather” is triggered, the bot will return “GetWeather”, and the intent of “BookFlight” will return “BookFlight”, and a “None” intent will return “No Intent”.  


### Connecting to LUIS in Node

1. Go back to the echo bot you made earlier and insert the following code into `index.js` (before the bot dialogs, and after `server.post('/api/messages', connector.listen());`)

    ```javascript
    var model = process.env.LUIS_MODEL;
    var recognizer = new builder.LuisRecognizer(model);
    var intents = new builder.IntentDialog({ recognizers: [recognizer] });

    bot.dialog('/', intents);
    intents.matches('None', '/none')
    .matches('GetWeather', '/getWeather')
    .matches('BookFlight', '/bookFlight')
    .onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."))
    ``` 

2. You can either setup an environment variable called `LUIS_MODEL` with your LUIS endpoint or just replace `process.env.LUIS_MODEL;` in index.js

    The above code has setup the LUIS model and matched our intents to dialogs in our application i.e. if the intent is `GetWeather` the `getWeather` bot dialog will be launched. Now we need to create the actaul dialogs that will be called.

3. Delete any existing dialogs you have in the `Bots Dialogs` section and copy in this code:

    ```javascript
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
    ```

4. Rebuild your code and run it. 

5. Go to the bot emulator and start entering test queries. When a intent of “GetWeather” is triggered, the bot will return a “GetWeather intent” message, intent of “BookFlight” will return “BookFlight intent”, and a “None” intent will return “No Intent”.  

## Additional Resources
[Bot Framework Samples for Node and C#](https://github.com/Microsoft/BotBuilder-Samples)

[Blog containing a master list of Bot Framework tutorials, samples and projects](https://blogs.msdn.microsoft.com/smich/2016/09/30/microsoft-bot-framework-resources/)

## Credit
By Lilian Kasem, February 2017

Credit for writing the original C# workshop:
- Darren Jefford
- Anthony Sadarangani
- Travis Hilbert

Please submit a pull request if you find mistakes or have something to add, thanks!
