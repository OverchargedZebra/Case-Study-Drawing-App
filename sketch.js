//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

var c;

//due to issues with my monitor I had to divide the value of canvas.elt.offsetLeft and canvas.elt.offsetTop by 2
function mousePressOnCanvas(canvas) {
	if (
		mouseX > canvas.elt.offsetLeft &&
		mouseX < canvas.elt.offsetLeft / 2 + canvas.width &&
		mouseY > canvas.elt.offsetTop &&
		mouseY < canvas.elt.offsetTop / 2 + canvas.height
	) {
		return true;
	}
	return false;
}

function preload() {
	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new erasingTool());
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new sprayCanTool());
	toolbox.addTool(new rectangleTool());
	toolbox.addTool(new ellipseTool());
	toolbox.addTool(new stampTool());
	toolbox.addTool(new editableShapeTool());
	toolbox.addTool(new mirrorDrawTool());

	//create helper functions
	helpers = new HelperFunctions();

	CreateNewLayer();
	//create the colour palette
	colourP = new ColourPalette();
}

function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select("#content");
	c = createCanvas(
		canvasContainer.size().width,
		canvasContainer.size().height
	);
	c.parent("content");

	background(255);

	loadPixels();
}

function draw() {
	//get value from size slider
	var size = document.getElementById("brush-size").value;
	currentLayer.strokeWeight(size);

	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		if (mousePressOnCanvas(c) == true) {
			toolbox.selectedTool.draw();
		}
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
	updatePixels();

	for (var i = 0; i < layers.length; i++) {
		image(layers[i], 0, 0);
	}
}
