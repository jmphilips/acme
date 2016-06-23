
var categories = $("#categories");
var selectValue;
categories.on("change", function() {
	selectValue = $("#categories").val();
	doThings()
});

var testing = new Promise((resolve, reject) => {

	$.ajax("categories.json").done( function(data){
		resolve(data);
	})
});

var getCategories = function() {
	return new Promise((resolve, reject) => {
		$.ajax("categories.json").done( function(data){
			resolve(data);
		})
	})
};

var loadCategories = function(argument) {
	$.each(argument, function(thing){
		var currentThing = argument[thing];
		$.each(currentThing, function(otherThing) {
			var newOption = document.createElement("option");
			
			newOption.innerText = currentThing[otherThing].name;
			newOption.value = currentThing[otherThing].id;
			$(categories).append(newOption);
			console.log(newOption)
		});
	});
};

var getTypes = function() {
		return new Promise((resolve, reject) => {
		$.ajax("types.json").done( function(data){
			resolve(data);
		})
	})
};

var loadTypes = function(anArgument) {
	$.each(anArgument, function(thing) {
		var currentThing = anArgument[thing];
		$.each(currentThing, function(otherThing){
	console.log("Mario?")
			if (currentThing[otherThing].category === selectValue) {
				console.log(currentThing[otherThing]);
			}
		})
	})
};

categories.on("change", function() {
	selectValue = $("#categories").val();


});

function doThings() {

	getTypes()
	.then(function(anArgument) {
	return(loadTypes(anArgument))
	})
};

getCategories()
.then(function (argument) {
	return loadCategories(argument);
})
.then(function () {
	console.log("Mariooooo?")
	return getTypes(selectValue)
})
.then(function(anArgument) {
	return(loadTypes(anArgument))
})




