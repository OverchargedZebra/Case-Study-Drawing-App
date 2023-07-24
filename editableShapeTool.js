function editableShapeTool() {
	this.name = "editableShapeTool";
	this.icon = "assets/editableShapeTool.png";

	var editButton;
	var finishButton;
	var undoButton;

	var editMode = false;
	var drawing = false;

	var currentShape = [];

	this.draw = function () {
		updatePixels();

		var size = parseInt(document.getElementById("brush-size").value);
		size *= 2;
		size = max(size, 20);

		if (mouseIsPressed) {
			if (!editMode && mousePressOnCanvas(c)) {
				if (!drawing) {
					drawing = true;
					currentShape.push({ x: mouseX, y: mouseY });
				}
			} else if (editMode && mousePressOnCanvas(c)) {
				push();
				fill(255, 0, 0);
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
					}
				}
			}
		} else if (drawing) {
			drawing = false;
		}

		push();
		noFill();
		beginShape();
		for (var i = 0; i < currentShape.length; i++) {
			vertex(currentShape[i].x, currentShape[i].y);
		}
		endShape();
		pop();

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
	};

	var editableShape = this;

	//adds a button and click handler to the options area. When clicked
	this.populateOptions = function () {
		select(".options").html(
			"<button id='editButton'>Edit shape</button> <button id='finishButton'>Finish</button> <button id='undoButton'>Undo</button>"
		);
		// 	//click handler
		editButton = select("#editButton");
		editButton.mouseClicked(function () {
			editMode = !editMode;
			if (editMode) {
				editButton.html("Add vertice");
			} else {
				editButton.html("Edit shape");
			}
		});

		finishButton = select("#finishButton");
		finishButton.mouseClicked(function () {
			editMode = false;
			editButton.html("Edit shape");

			editableShape.draw();

			currentShape = [];

			loadPixels();
		});

		undoButton = select("#undoButton");
		undoButton.mouseClicked(function () {
			if (currentShape.length > 0) {
				currentShape.splice(currentShape.length - 1, 1);
			}
			editableShape.draw();
			console.log(currentShape);
		});

		select("#clearButton").mouseClicked(function () {
			currentShape = [];

			background(255);

			loadPixels();
		});
	};
}
