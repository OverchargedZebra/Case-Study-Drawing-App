function erasingTool() {
	this.icon = "assets/erasingTool.png";
	this.name = "erasingTool";

	var shapeButton;
	var shapeMode = true;

	var eraserColour = [255, 255, 255];

	this.draw = function (pg = currentLayer, tpg = layers[layers.length - 1]) {
		var size = parseInt(document.getElementById("brush-size").value);
		size *= 2;
		tpg.updatePixels();

		pg.push();
		if (mouseIsPressed) {
			pg.fill(color(eraserColour));
			pg.noStroke();
			if (shapeMode) {
				pg.rect(mouseX - size / 2, mouseY - size / 2, size, size);
			} else {
				pg.ellipse(mouseX, mouseY, size, size);
			}
		}
		pg.pop();

		tpg.loadPixels();

		tpg.push();
		tpg.noFill();
		tpg.strokeWeight(1);
		tpg.stroke(0);
		if (shapeMode) {
			tpg.rect(mouseX - size / 2, mouseY - size / 2, size, size);
		} else {
			tpg.ellipse(mouseX, mouseY, size, size);
		}
		tpg.pop();

		console.log(mouseX * mouseY);
		console.log(pg.pixels[mouseX * mouseY]);
	};

	this.unselectTool = function () {
		layers[layers.length - 1].updatePixels();
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
