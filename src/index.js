//console.log("Hello world");
var fetch = require("node-fetch");
var express = require("express");
var cheerio = require("cheerio");
var sqlite3 = require('sqlite3');


var app = express();
var db = new sqlite3.Database(':memory:');

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
		pizzas = processText(text);
		pizzadb(pizzas);
		res.send(pizzas);

	});
});

app.listen(8099, function(){
	console.log("Working 8099");
});

function pizzadb(pizzas){
	db.serialize(function() {
	  db.run("CREATE TABLE pizza (title TEXT, ingredients TEXT, pizzeria TEXT)");
		 
	  var stmt = db.prepare("INSERT INTO pizza(title, ingredients, pizzeria) VALUES (?, ?, ?)");
	for (var i=0; i<pizzas.length; i++){
		var p = pizzas[i];
		stmt.run(p.title, p.ingredients, p.pizzeria);
	  }

  stmt.finalize();
  db.each("SELECT rowid AS id, title, ingredients, pizzeria FROM pizza", function(err, row) {
      console.log(row);
  });
});
};