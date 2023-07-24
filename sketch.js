//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

var c;

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

function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select("#content");
	c = createCanvas(
		canvasContainer.size().width,
		canvasContainer.size().height
	);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

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
	background(255);
}

function draw() {
	//get value from size slider
	var size = document.getElementById("brush-size").value;
	strokeWeight(size);

	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		if (mousePressOnCanvas(c) == true) toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}
