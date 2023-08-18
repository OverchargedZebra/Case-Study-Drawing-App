function erasingTool() {
	this.icon = "assets/erasingTool.png";
	this.name = "erasingTool";

	var shapeButton;
	var shapeMode = true;

	var eraserColour = [255, 255, 255];

	this.draw = function () {
		var size = parseInt(document.getElementById("brush-size").value);
		size *= 2;
		updatePixels();

		push();
		if (mouseIsPressed) {
			fill(color(eraserColour));
			noStroke();
			if (shapeMode) {
				rect(mouseX - size / 2, mouseY - size / 2, size, size);
			} else {
				ellipse(mouseX, mouseY, size, size);
			}
		}
		pop();

		loadPixels();

		push();
		noFill();
		strokeWeight(1);
		stroke(0);
		if (shapeMode) {
			rect(mouseX - size / 2, mouseY - size / 2, size, size);
		} else {
			ellipse(mouseX, mouseY, size, size);
		}
		pop();
	};

	this.unselectTool = function () {
		updatePixels();

		select(".options").html("");
	};

	this.populateOptions = function () {
		select(".options").html(
			"<button id='shapeButton'>circular eraser</button><input type='color' id='eraserColourPicker' style='display:none;'><button id='eraserColourButton'>choose eraser colour</button>"
		);

		shapeButton = select("#shapeButton");
		shapeButton.mouseClicked(function () {
			shapeMode = !shapeMode;
			if (shapeMode) {
				shapeButton.html("circular eraser");
			} else {
				shapeButton.html("rect eraser");
			}
		});

		select("#eraserColourButton").mouseClicked(function () {
			this.elt.previousSibling.showPicker();
		});

		select("#eraserColourPicker").input(function () {
			eraserColour = document.getElementById("eraserColourPicker").value;
		});
	};
}
