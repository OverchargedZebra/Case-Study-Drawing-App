var layers = [];
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
	SelectLayer(currentLayerIndex);
}

function MoveLayer(position = "up") {
	if (
		!(
			position === "up" ||
			position === "down" ||
			position === "top" ||
			position === "bottom"
		)
	) {
		return;
	}

	if (position === "up" && currentLayerIndex > 0) {
		Switcher(currentLayerIndex, currentLayerIndex - 1);
		currentLayerIndex -= 1;
	} else if (position === "down" && currentLayerIndex < layers.length - 1) {
		Switcher(currentLayerIndex, currentLayerIndex + 1);
		currentLayerIndex += 1;
	} else if (position === "top") {
		Switcher(currentLayerIndex, 0);
		currentLayerIndex = 0;
	} else if (position === "bottom") {
		Switcher(currentLayerIndex, layers.length - 1);
		currentLayerIndex = layers.length - 1;
	}

	SelectLayer(currentLayerIndex);
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
}

function Switcher(index1, index2) {
	var temp = layers[index1];
	layers[index1] = layers[index2];
	layers[index2] = temp;
}
