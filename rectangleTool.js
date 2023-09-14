function rectangleTool() {
	this.icon = "assets/rectangleTool.png";
	this.name = "rectangleTool";

	var deltaX = -1;
	var deltaY = -1;
	var startMouseX = -1;
	var startMouseY = -1;
	var shapeWidth = -1;
	var shapeHeight = -1;

	var originX;
	var originY;

	var drawing = false;
	var editMode = false;
	var moving = false;

	var cornerCircles = [];
	var sideRectangles = [];

	this.draw = function (pg = currentLayer, tpg = layers[layers.length - 1]) {
		//display the last save state of pixels
		pg.updatePixels();
		tpg.updatePixels();

		//mouseIsPressed is a variable that p5 provides for us which tells us in boolean if the mouse is pressed or not
		if (mouseIsPressed) {
			//if the previous values are -1 set them to the current mouse location and set drawing to true and load the pixels
			if (drawing == false) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
			} else if (editMode == false) {
				//draw a line from the start position to the current mouse position
				shapeWidth = mouseX - startMouseX;
				shapeHeight = mouseY - startMouseY;
			} else {
				calculationsForEditMode();
			}
		}
		//if the mouse isn't pressed reset the previous values to -1 and set drawing to false
		else if (drawing == true && editMode == false) {
			editMode = true;
			moving = false;

			calculateValues();

			select("#finishButton").elt.style.display = "inline";
		} else if (drawing == true) {
			moving = false;
		}

		pg.rect(startMouseX, startMouseY, shapeWidth, shapeHeight);

		drawVisualizers(tpg);
	};

	//used to move anchor/shape and resize the shape
	var calculationsForEditMode = function () {
		//dealing with rectangles
		//top rectangle
		if (
			mouseX > sideRectangles[0].x &&
			mouseX < sideRectangles[0].x + sideRectangles[0].width &&
			mouseY > sideRectangles[0].y &&
			mouseY < sideRectangles[0].y + sideRectangles[0].height
		) {
			deltaY = mouseY - startMouseY;
			startMouseY = mouseY;
			shapeHeight -= deltaY;
		}
		//bottom rectangle
		else if (
			mouseX > sideRectangles[1].x &&
			mouseX < sideRectangles[1].x + sideRectangles[1].width &&
			mouseY > sideRectangles[1].y &&
			mouseY < sideRectangles[1].y + sideRectangles[1].height
		) {
			deltaY = mouseY - startMouseY;
			shapeHeight = deltaY;
		}
		//left rectangle
		else if (
			mouseX > sideRectangles[2].x &&
			mouseX < sideRectangles[2].x + sideRectangles[2].width &&
			mouseY > sideRectangles[2].y &&
			mouseY < sideRectangles[2].y + sideRectangles[2].height
		) {
			deltaX = mouseX - startMouseX;
			startMouseX = mouseX;
			shapeWidth -= deltaX;
		}
		//right rectangle
		else if (
			mouseX > sideRectangles[3].x &&
			mouseX < sideRectangles[3].x + sideRectangles[3].width &&
			mouseY > sideRectangles[3].y &&
			mouseY < sideRectangles[3].y + sideRectangles[3].height
		) {
			deltaX = mouseX - startMouseX;
			shapeWidth = deltaX;
		}

		//deal with circles
		//deal with top left circle
		else if (
			dist(mouseX, mouseY, cornerCircles[0].x, cornerCircles[0].y) <= 20
		) {
			deltaX = mouseX - startMouseX;
			startMouseX = mouseX;
			shapeWidth -= deltaX;

			deltaY = mouseY - startMouseY;
			startMouseY = mouseY;
			shapeHeight -= deltaY;
		}
		//deal with top right circle
		else if (
			dist(mouseX, mouseY, cornerCircles[1].x, cornerCircles[1].y) <= 20
		) {
			deltaX = mouseX - startMouseX;
			shapeWidth = deltaX;

			deltaY = mouseY - startMouseY;
			startMouseY = mouseY;
			shapeHeight -= deltaY;
		}
		//deal with bottom left circle
		else if (
			dist(mouseX, mouseY, cornerCircles[2].x, cornerCircles[2].y) <= 20
		) {
			deltaX = mouseX - startMouseX;
			startMouseX = mouseX;
			shapeWidth -= deltaX;

			deltaY = mouseY - startMouseY;
			shapeHeight = deltaY;
		}
		//deal with bottom right circle
		else if (
			dist(mouseX, mouseY, cornerCircles[3].x, cornerCircles[3].y) <= 20
		) {
			deltaX = mouseX - startMouseX;
			shapeWidth = deltaX;

			deltaY = mouseY - startMouseY;
			shapeHeight = deltaY;
		}
		//dealing with moving of shape by dragging mouse
		else if (
			((mouseX > startMouseX && mouseX < startMouseX + shapeWidth) ||
				(mouseX < startMouseX && mouseX > startMouseX + shapeWidth)) &&
			((mouseY > startMouseY && mouseY < startMouseY + shapeHeight) ||
				(mouseY < startMouseY && mouseY > startMouseY + shapeHeight))
		) {
			if (moving == false) {
				originX = mouseX;
				originY = mouseY;

				deltaX = originX - startMouseX;
				deltaY = originY - startMouseY;

				moving = true;
			} else {
				startMouseX = mouseX - deltaX;

				startMouseY = mouseY - deltaY;
			}
		}

		calculateValues();
	};

	//calculates location for anchors after changing values
	var calculateValues = function () {
		//null the values
		cornerCircles = [];
		sideRectangles = [];

		//push corner circle values
		//top left circle
		cornerCircles.push({ x: startMouseX, y: startMouseY });
		//top right circle
		cornerCircles.push({
			x: startMouseX + shapeWidth,
			y: startMouseY,
		});
		//bottom left circle
		cornerCircles.push({
			x: startMouseX,
			y: startMouseY + shapeHeight,
		});
		//bottom right circle
		cornerCircles.push({
			x: startMouseX + shapeWidth,
			y: startMouseY + shapeHeight,
		});

		//push rectangle values
		var verticalMidPoint = (2 * startMouseX + shapeWidth) / 2;
		var horizontalMidPoint = (2 * startMouseY + shapeHeight) / 2;
		var tempWidth = shapeWidth / 5;
		var tempHeight = shapeHeight / 5;
		//top rectangle
		sideRectangles.push({
			x: verticalMidPoint - tempWidth,
			y: startMouseY - 13.75,
			width: tempWidth * 2,
			height: 20,
		});
		//bottom rectangle
		sideRectangles.push({
			x: verticalMidPoint - tempWidth,
			y: startMouseY + shapeHeight - 6.25,
			width: tempWidth * 2,
			height: 20,
		});
		//left rectangle
		sideRectangles.push({
			x: startMouseX - 13.75,
			y: horizontalMidPoint - tempHeight,
			width: 20,
			height: tempHeight * 2,
		});
		//right rectangle
		sideRectangles.push({
			x: startMouseX + shapeWidth - 6.25,
			y: horizontalMidPoint - tempHeight,
			width: 20,
			height: tempHeight * 2,
		});
	};

	//draws the visualizers at top most layer
	var drawVisualizers = function (tpg) {
		tpg.push();
		if (editMode) {
			tpg.fill(255, 0, 0);
			tpg.noStroke();

			//corner circles
			//top left corner
			tpg.ellipse(cornerCircles[0].x, cornerCircles[0].y, 20, 20);
			//top right corner
			tpg.ellipse(cornerCircles[1].x, cornerCircles[1].y, 20, 20);
			//bottom left corner
			tpg.ellipse(cornerCircles[2].x, cornerCircles[2].y, 20, 20);
			//bottom right corner
			tpg.ellipse(cornerCircles[3].x, cornerCircles[3].y, 20, 20);

			//side rectangle
			//top rectangle
			tpg.rect(
				sideRectangles[0].x,
				sideRectangles[0].y,
				sideRectangles[0].width,
				sideRectangles[0].height
			);
			//bottom rectangle
			tpg.rect(
				sideRectangles[1].x,
				sideRectangles[1].y,
				sideRectangles[1].width,
				sideRectangles[1].height
			);
			//left rectangle
			tpg.rect(
				sideRectangles[2].x,
				sideRectangles[2].y,
				sideRectangles[2].width,
				sideRectangles[2].height
			);
			//right rectangle
			tpg.rect(
				sideRectangles[3].x,
				sideRectangles[3].y,
				sideRectangles[3].width,
				sideRectangles[3].height
			);
		}
		tpg.pop();
	};

	//used to hide or show brush slider
	var brushSize = document.getElementById("brush-size");
	var brushSizeLabel = document.getElementById("brush-size-label");

	//unselects tool, sets values to null, shows size slide
	this.unselectTool = function () {
		//show  brush size and its label
		brushSize.style.display = "inline";
		brushSizeLabel.style.display = "inline";

		//clear options
		select(".options").html("");

		select("#clearButton").elt.removeEventListener(
			"click",
			rectangleToolClear
		);

		editMode = false;
		drawing = false;
		moving = false;
		self.draw();

		currentLayer.loadPixels();
		layers[layers.length - 1].loadPixels();

		cornerCircles = [];
		sideRectangles = [];

		deltaX = -1;
		deltaY = -1;
		startMouseX = -1;
		startMouseY = -1;
		shapeWidth = 0;
		shapeHeight = 0;
	};

	//populates options while hiding brush
	var self = this;
	this.populateOptions = function () {
		//hide  brush size and its label
		brushSize.style.display = "none";
		brushSizeLabel.style.display = "none";

		select(".options").html(
			"<button id='finishButton'>finish shape</button>"
		);

		select("#finishButton").mouseClicked(function () {
			editMode = false;
			drawing = false;
			moving = false;

			this.elt.style.display = "none";
			self.draw();

			currentLayer.loadPixels();
			layers[layers.length - 1].loadPixels();

			cornerCircles = [];
			sideRectangles = [];

			deltaX = -1;
			deltaY = -1;
			startMouseX = -1;
			startMouseY = -1;
			shapeWidth = 0;
			shapeHeight = 0;
		});

		select("#finishButton").elt.style.display = "none";

		select("#clearButton").elt.addEventListener(
			"click",
			rectangleToolClear
		);
	};

	//sets values to default
	this.refresh = function () {
		editMode = false;
		drawing = false;
		moving = false;

		cornerCircles = [];
		sideRectangles = [];

		deltaX = -1;
		deltaY = -1;
		startMouseX = -1;
		startMouseY = -1;
		shapeWidth = 0;
		shapeHeight = 0;

		currentLayer.loadPixels();
	};

	//adds functionality for clear function
	var rectangleToolClear = function () {
		select("#finishButton").elt.style.display = "none";

		editMode = false;
		drawing = false;
		moving = false;

		cornerCircles = [];
		sideRectangles = [];

		deltaX = -1;
		deltaY = -1;
		startMouseX = -1;
		startMouseY = -1;
		shapeWidth = 0;
		shapeHeight = 0;

		self.draw();

		layers[currentLayerIndex].loadPixels();
	};
}
