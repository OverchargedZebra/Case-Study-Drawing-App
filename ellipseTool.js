function ellipseTool() {
	this.icon = "assets/ellipseTool.png";
	this.name = "ellipseTool";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function (pg = currentLayer) {
		//mouseIsPressed is a variable that p5 provides for us which tells us in boolean if the mouse is pressed or not
		if (mouseIsPressed) {
			//if the previous values are -1 set them to the current mouse location and set drawing to true and load the pixels
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current state of the pixels
				pg.loadPixels();
			} else {
				//display the last save state of pixels
				pg.updatePixels();
				//draw a line from the start position to the current mouse position
				pg.ellipse(
					(startMouseX + mouseX) / 2,
					(startMouseY + mouseY) / 2,
					startMouseX - mouseX,
					startMouseY - mouseY
				);
			}
		}

		//if the mouse isn't pressed reset the previous values to -1 and set drawing to false
		else if (drawing) {
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = function () {
		currentLayer.loadPixels();
	};

	this.refresh = function () {
		currentLayer.loadPixels();
	};
}
