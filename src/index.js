//console.log("Hello world");
var fetch = require("node-fetch");
var express = require("express");
var cheerio = require("cheerio");

var app = express();


function processText(text){
	var $ = cheerio.load(text);

	var listItems = Array.from($("#tiles").children("li"));
	return listItems.map(function(li){

		var prices = $(li).find(".pretVal");

		return{
			title : $(li).find(".title").text(),
			ingredients : $(li).find(".ingrediente").text().trim(),
			image : "http://dopopoco.ro" + $(li).find("img").attr("src"),
			pretMic : $(prices[0]).text(),
			pretMare : $(prices[1]).text(),
			pizzeria: "Doppopoco"
		};
	});
}

app.get("/hello", function(req, res){
	var dopopocoSite = fetch("http://dopopoco.ro/meniu-individual-timisoara");
	var textResponse = dopopocoSite.then(function(response){
		return response.text();
	});
	textResponse.then(function(text){
		res.send(processText(text));
	});
});

app.listen(8099, function(){
	console.log("Working 8099");
});
