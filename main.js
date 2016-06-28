
var categories = $("#categories");
var outputEl = $("#outputEl")
var types = $("#types")

var selectValue;
var typeSelect;


categories.on("change", function() {
	selectValue = $("#categories").val();
	doThings()
});

types.on("change", function() {
	typeSelect = $("#types").val();
	doTypes()
})


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
			$(categories).append(newOption)
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
	$(outputEl).empty();
	$.each(anArgument, function(thing) {
		var currentThing = anArgument[thing];
		$.each(currentThing, function(otherThing){
				$(outputEl).innerHTML = ""
				if (currentThing[otherThing].category == selectValue) {
				var newType = document.createElement("option")

				newType.innerText = currentThing[otherThing].name;
				newType.value = currentThing[otherThing].id;
				$(types).append(newType)	
			}
		})
	})
};

var getProducts = function() {
	return new Promise((resolve, reject) => {
		$.ajax("products.json").done( function(data){
			resolve(data);
		})
	})
};

var loadProducts = function(anArgument) {
	$.each(anArgument, function(thing) {
		var currentThing = anArgument[thing];
		$.each(currentThing, function(otherThing) {
			$.each(currentThing[otherThing], function(otherOther) {
					var thisThing = currentThing[otherThing][otherOther]
					if (thisThing.type == typeSelect) {
						
					}
				})
			})
		})
	};



function doThings() {
	getTypes()
	.then(function(anArgument) {
		return(loadTypes(anArgument))
	})
};

function doTypes() {
	getProducts()
	.then(function(anArgument) {
		return(loadProducts(anArgument))
	})
};

getCategories()
.then(function (argument) {
	return loadCategories(argument);
})
.then(function () {
	return getTypes(selectValue)
})
.then(function(anArgument) {
	return(loadTypes(anArgument))
})
.then(function () {
	return getProducts(typeSelect)
})
.then(function (anArgument) {
	return loadProducts(anArgument)
});




