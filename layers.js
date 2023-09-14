var layers = [];
var layersNames = [];
var layerCounter = 0;
var currentLayer;
var currentLayerIndex = 0;

function CreateNewLayer() {
	canvasContainer = select("#content");
	var pg = createGraphics(
		canvasContainer.size().width,
		canvasContainer.size().height
	);

	layers.push(pg);
	currentLayerIndex = layers.length - 1;

	layerCounter += 1;
	layersNames.push("layer " + layerCounter);

	CreateGuiElement();

	SelectLayer(currentLayerIndex);
}

function CreateGuiElement() {
	var div = createDiv();
	div.id(layersNames[layersNames.length - 1]);
	div.class("layers-menu-elements");
	div.elt.dataset.index = currentLayerIndex;
	select("#layers-menu-content").child(div);

	var button = createButton(layersNames[layersNames.length - 1]);
	button.class("layers-menu-elements-button");
	div.child(button);
	button.elt.addEventListener("click", LayerMouseClick);
}

var LayerMouseClick = function () {
	SelectLayer(parseInt(this.parentElement.dataset.index));
};

function DeleteLayer() {
	var divArray = document.getElementsByClassName("layers-menu-elements");
	divArray[currentLayerIndex + 2].remove();
	layers.splice(currentLayerIndex, 1);

	if (currentLayerIndex > 0) currentLayerIndex -= 1;

	if (layers.length < 1) {
		CreateNewLayer();
	} else {
		SelectLayer(currentLayerIndex);
	}
}

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

	//if the tool has an options area. Populate it now.
	if (toolbox.selectedTool.hasOwnProperty("populateOptions")) {
		toolbox.selectedTool.populateOptions();
	}

	//if the tool has an refresh method refresh it
	if (toolbox.selectedTool.hasOwnProperty("refresh")) {
		toolbox.selectedTool.refresh();
	}

	currentLayerIndex = index;
	currentLayer = layers[currentLayerIndex];

	var divArray = document.getElementsByClassName("layers-menu-elements");
	for (var i = 0; i < divArray.length; i++) {
		//index + 2 to account for create new layer and delete layer button
		if (i != index + 2) {
			divArray[i].style.background = "#444";
		} else {
			divArray[i].style.background = "orange";
		}
	}

	if (colourP != null) {
		currentLayer.fill(colourP.selectedColour);
		currentLayer.stroke(colourP.selectedColour);
	}
}

function Switcher(arr, index1, index2) {
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}
