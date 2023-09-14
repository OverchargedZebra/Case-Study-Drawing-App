var layers = []; //holds all the layers
var layersName = ""; //name of the layer to be made
var layerCounter = 0; //keeps track of layer count for user
var currentLayer = null; //holds information about current layer
var currentLayerIndex = 0; //leeps track of current layer index

//creates new layer and automatically sets it as current layer
function CreateNewLayer() {
	//sets size of each layer equal to canvasContainer
	canvasContainer = select("#content");
	var pg = createGraphics(
		canvasContainer.size().width,
		canvasContainer.size().height
	);

	//pushes new layer
	layers.push(pg);
	currentLayerIndex = layers.length - 1;

	layerCounter += 1;
	layersName = "layer " + layerCounter;

	//creates the layer gui element
	CreateGuiElement();

	//selects the new layer which was created
	SelectLayer(currentLayerIndex);
}

//creates the buttons for selecting layers
function CreateGuiElement() {
	//makes the div, sets the id to layer name, sets class name, sets a dataset variable index and stores current index, and sets as a child to layers menu content
	var div = createDiv();
	div.id(layersName);
	div.class("layers-menu-elements");
	div.elt.dataset.index = currentLayerIndex;
	select("#layers-menu-content").child(div);

	//makes a button, sets it to layers-menu-elements-button class, sets as a child to previous div and attaches the function select layer to it
	var button = createButton(layersName);
	button.class("layers-menu-elements-button");
	div.child(button);
	button.elt.addEventListener("click", LayerMouseClick);
}

//selects layer associated to the button
var LayerMouseClick = function () {
	//parseInt was used because it would return string value when we needed a int value
	SelectLayer(parseInt(this.parentElement.dataset.index));
};

//deletes the current layer, if layers become empty then it makes a new layer
function DeleteLayer() {
	var divArray = document.getElementsByClassName("layers-menu-elements");
	//starts from current layer + 3 because we need to account for all the layers after current layer after current layer, +3 instead of +1 because of create new layer and delete layer buttons
	for (var i = currentLayerIndex + 3; i < divArray.length; i++) {
		divArray[i].dataset.index -= 1;
	}
	divArray[currentLayerIndex + 2].remove(); //removes current layer html elements
	layers.splice(currentLayerIndex, 1); //removes layer from processing

	//if number of layers after deletion is greater then 0, select the layer above
	if (currentLayerIndex > 0) currentLayerIndex -= 1;

	//if layers reaches 0, create a new layer
	if (layers.length < 1) {
		CreateNewLayer();
	} else {
		SelectLayer(currentLayerIndex);
	}
}

//selects the layer and highlights the current layer
function SelectLayer(index) {
	if (index < 0 || index > layers.length - 1) {
		alert("layer does not exist");
		return;
	}

	//if the tool has an unselectTool method run it.
	if (
		toolbox.selectedTool != null &&
		toolbox.selectedTool.hasOwnProperty("unselectTool")
	) {
		toolbox.selectedTool.unselectTool();
	}

	//selects desired layer
	currentLayerIndex = index;
	currentLayer = layers[currentLayerIndex];

	//if the tool has an options area. Populate it now.
	if (toolbox.selectedTool.hasOwnProperty("populateOptions")) {
		toolbox.selectedTool.populateOptions();
	}

	//if the tool has an refresh method refresh it
	if (toolbox.selectedTool.hasOwnProperty("refresh")) {
		toolbox.selectedTool.refresh();
	}

	//highlights the selected layer, +2 used to account for create and delete layer button
	var divArray = document.getElementsByClassName("layers-menu-elements");
	for (var i = 0; i < divArray.length; i++) {
		//index + 2 to account for create new layer and delete layer button
		if (i != index + 2) {
			divArray[i].style.background = "#444";
		} else {
			divArray[i].style.background = "orange";
		}
	}

	//done to make sure selected colour presists through changing
	if (colourP != null) {
		currentLayer.fill(colourP.selectedColour);
		currentLayer.stroke(colourP.selectedColour);
	}
}
