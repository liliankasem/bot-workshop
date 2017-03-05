using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.Luis;
using Microsoft.Bot.Builder.Luis.Models;

namespace MyFirstBot.TravelApp
{

	[LuisModel("YOUR_LUIS_MODEL_ID", "YOUR_LUIS_KEY")]
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
			//context.
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
