var layers = [];
var currentLayer;

function CreateNewLayer() {
	var pg = createGraphics(c.width, c.height);

	layers.push(pg);
	currentLayer = layers[layers.length - 1];
}
