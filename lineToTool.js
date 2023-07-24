function LineToTool() {
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function () {
		//mouseIsPressed is a variable that p5 provides for us which tells us in boolean if the mouse is pressed or not
		if (mouseIsPressed) {
			//if the previous values are -1 set them to the current mouse location and set drawing to true and load the pixels
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current state of the pixels
				loadPixels();
			} else {
				//display the last save state of pixels
				updatePixels();
				//draw a line from the start position to the current mouse position
				line(startMouseX, startMouseY, mouseX, mouseY);
			}
		}

		//if the mouse isn't pressed reset the previous values to -1 and set drawing to false
		else if (drawing) {
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
}
