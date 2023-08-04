function editableShapeTool() {
	this.name = "editableShapeTool";
	this.icon = "assets/editableShapeTool.png";

	var editButton;
	var curveButton;
	var finishButton;
	var undoButton;

	var editMode = false;
	var curveMode = false;
	var drawing = false;

	var currentShape = [];
	var curves = [];

	this.draw = function () {
		updatePixels();

		var size = parseInt(document.getElementById("brush-size").value);
		size *= 2;
		size = max(size, 20);

		if (mouseIsPressed) {
			if (!editMode && !curveMode && mousePressOnCanvas(c) && !drawing) {
				drawing = true;
				currentShape.push({ x: mouseX, y: mouseY });

				if (currentShape.length > 1) {
					var avgX =
						(currentShape[currentShape.length - 1].x -
							currentShape[currentShape.length - 2].x) /
						3;
					var avgY =
						(currentShape[currentShape.length - 1].y -
							currentShape[currentShape.length - 2].y) /
						3;

					curves.push({
						x1: currentShape[currentShape.length - 2].x + avgX,
						y1: currentShape[currentShape.length - 2].y + avgY,
						x2: currentShape[currentShape.length - 2].x + avgX * 2,
						y2: currentShape[currentShape.length - 2].y + avgY * 2,
					});
				}
			} else if (editMode && mousePressOnCanvas(c)) {
				for (var i = 0; i < currentShape.length; i++) {
					if (
						dist(
							mouseX,
							mouseY,
							currentShape[i].x,
							currentShape[i].y
						) < size
					) {
						currentShape[i].x = mouseX;
						currentShape[i].y = mouseY;

						if (i == 0) {
							var avgX =
								(currentShape[i + 1].x - currentShape[i].x) / 3;
							var avgY =
								(currentShape[i + 1].y - currentShape[i].y) / 3;

							curves[i].x1 = currentShape[i].x + avgX;
							curves[i].y1 = currentShape[i].y + avgY;
							curves[i].x2 = currentShape[i].x + avgX * 2;
							curves[i].y2 = currentShape[i].y + avgY * 2;
						} else if (i == currentShape.length - 1) {
							var avgX =
								(currentShape[i].x - currentShape[i - 1].x) / 3;
							var avgY =
								(currentShape[i].y - currentShape[i - 1].y) / 3;

							curves[i - 1].x1 = currentShape[i - 1].x + avgX;
							curves[i - 1].y1 = currentShape[i - 1].y + avgY;
							curves[i - 1].x2 = currentShape[i - 1].x + avgX * 2;
							curves[i - 1].y2 = currentShape[i - 1].y + avgY * 2;
						} else {
							var avgX =
								(currentShape[i + 1].x - currentShape[i].x) / 3;
							var avgY =
								(currentShape[i + 1].y - currentShape[i].y) / 3;

							curves[i].x1 = currentShape[i].x + avgX;
							curves[i].y1 = currentShape[i].y + avgY;
							curves[i].x2 = currentShape[i].x + avgX * 2;
							curves[i].y2 = currentShape[i].y + avgY * 2;

							avgX =
								(currentShape[i].x - currentShape[i - 1].x) / 3;
							avgY =
								(currentShape[i].y - currentShape[i - 1].y) / 3;

							curves[i - 1].x1 = currentShape[i - 1].x + avgX;
							curves[i - 1].y1 = currentShape[i - 1].y + avgY;
							curves[i - 1].x2 = currentShape[i - 1].x + avgX * 2;
							curves[i - 1].y2 = currentShape[i - 1].y + avgY * 2;
						}
					}
				}
			} else if (curveMode && mousePressOnCanvas(c)) {
				for (var i = 0; i < curves.length; i++) {
					if (
						dist(mouseX, mouseY, curves[i].x1, curves[i].y1) < size
					) {
						curves[i].x1 = mouseX;
						curves[i].y1 = mouseY;
					}
					if (
						dist(mouseX, mouseY, curves[i].x2, curves[i].y2) < size
					) {
						curves[i].x2 = mouseX;
						curves[i].y2 = mouseY;
					}
				}
			}
		} else if (drawing) {
			drawing = false;
		}

		if (currentShape.length > 1) {
			push();
			noFill();
			for (var i = 0; i < currentShape.length - 1; i++) {
				bezier(
					currentShape[i].x,
					currentShape[i].y,
					curves[i].x1,
					curves[i].y1,
					curves[i].x2,
					curves[i].y2,
					currentShape[i + 1].x,
					currentShape[i + 1].y
				);
			}
			pop();
		}

		if (editMode) {
			push();
			fill(255, 0, 0);
			noStroke();
			for (var i = 0; i < currentShape.length; i++) {
				ellipse(currentShape[i].x, currentShape[i].y, size);
			}
			noFill();
			pop();
		}
		if (curveMode) {
			push();
			fill(255, 0, 0);
			noStroke();
			for (var i = 0; i < curves.length; i++) {
				ellipse(curves[i].x1, curves[i].y1, size);
				ellipse(curves[i].x2, curves[i].y2, size);
			}
			noFill();
			pop();
		}
	};

	//when the tool is deselected update the pixels to just show the drawing
	this.unselectTool = function () {
		updatePixels();
		//clear options
		select(".options").html("");

		select("#clearButton").mouseClicked(function () {
			background(255);

			loadPixels();
		});

		editMode = false;
		curveMode = false;

		editableShape.draw();

		currentShape = [];
		curves = [];
		loadPixels();
	};

	var editableShape = this;

	//adds a button and click handler to the options area. When clicked
	this.populateOptions = function () {
		select(".options").html(
			"<button id='editButton'>Edit shape</button> <button id='curve-button'>Curve shape</button> <button id='finishButton'>Finish</button> <button id='undoButton'>Undo</button>"
		);
		// 	//click handler
		editButton = select("#editButton");
		editButton.mouseClicked(function () {
			editMode = !editMode;
			if (curveMode) {
				curveMode = false;
				curveButton.html("Curve shape");
			}

			if (editMode) {
				editButton.html("Add vertice");
			} else {
				editButton.html("Edit shape");
			}
		});

		curveButton = select("#curve-button");
		curveButton.mouseClicked(function () {
			curveMode = !curveMode;
			if (editMode) {
				editMode = false;
				editButton.html("Edit shape");
			}

			if (currentShape.length > 1 && curveMode) {
				curveButton.html("Stop curve");
			} else if (currentShape.length > 1) {
				curveButton.html("Curve shape");
			}
		});

		finishButton = select("#finishButton");
		finishButton.mouseClicked(function () {
			editMode = false;
			editButton.html("Edit shape");

			curveMode = false;
			curveButton.html("Curve shape");

			editableShape.draw();

			currentShape = [];
			curves = [];

			loadPixels();
		});

		undoButton = select("#undoButton");
		undoButton.mouseClicked(function () {
			if (currentShape.length > 0) {
				currentShape.splice(currentShape.length - 1, 1);
			}
			if (curves.length > 0) {
				curves.splice(curves.length - 1, 1);
			}
			editableShape.draw();
		});

		select("#clearButton").mouseClicked(function () {
			currentShape = [];
			curves = [];

			background(255);

			editMode = false;
			editButton.html("Edit shape");

			curveMode = false;
			curveButton.html("Curve shape");

			loadPixels();
		});
	};
}
