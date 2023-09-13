function pictureTool() {
	this.icon = "assets/pictureTool.png";
	this.name = "pictureTool";

	var deltaX = -1;
	var deltaY = -1;
	var startMouseX = -1;
	var startMouseY = -1;
	var shapeWidth = 1;
	var shapeHeight = 1;

	var originX;
	var originY;

	var selectedImage = null;
	var drawing = false;
	var editMode = false;
	var moving = false;

	var cornerCircles = [];
	var sideRectangles = [];

	this.draw = function (pg = currentLayer, tpg = layers[layers.length - 1]) {
		//display the last save state of pixels
		pg.updatePixels();
		tpg.updatePixels();

		if (selectedImage == null) return;

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
					dist(
						mouseX,
						mouseY,
						cornerCircles[0].x,
						cornerCircles[0].y
					) <= 20
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
					dist(
						mouseX,
						mouseY,
						cornerCircles[1].x,
						cornerCircles[1].y
					) <= 20
				) {
					deltaX = mouseX - startMouseX;
					shapeWidth = deltaX;

					deltaY = mouseY - startMouseY;
					startMouseY = mouseY;
					shapeHeight -= deltaY;
				}
				//deal with bottom left circle
				else if (
					dist(
						mouseX,
						mouseY,
						cornerCircles[2].x,
						cornerCircles[2].y
					) <= 20
				) {
					deltaX = mouseX - startMouseX;
					startMouseX = mouseX;
					shapeWidth -= deltaX;

					deltaY = mouseY - startMouseY;
					shapeHeight = deltaY;
				}
				//deal with bottom right circle
				else if (
					dist(
						mouseX,
						mouseY,
						cornerCircles[3].x,
						cornerCircles[3].y
					) <= 20
				) {
					deltaX = mouseX - startMouseX;
					shapeWidth = deltaX;

					deltaY = mouseY - startMouseY;
					shapeHeight = deltaY;
				}
				//dealing with moving of shape by dragging mouse
				else if (
					((mouseX > startMouseX &&
						mouseX < startMouseX + shapeWidth) ||
						(mouseX < startMouseX &&
							mouseX > startMouseX + shapeWidth)) &&
					((mouseY > startMouseY &&
						mouseY < startMouseY + shapeHeight) ||
						(mouseY < startMouseY &&
							mouseY > startMouseY + shapeHeight))
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

		pg.image(
			selectedImage,
			startMouseX,
			startMouseY,
			shapeWidth,
			shapeHeight
		);

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

	//used to hide colour swatches
	var colourSwatches = document.getElementsByClassName("colourSwatches");

	//used to hide or show brush slider
	var brushSize = document.getElementById("brush-size");
	var brushSizeLabel = document.getElementById("brush-size-label");

	this.unselectTool = function () {
		//return colour swatches to original style
		for (let i = 0; i < colourSwatches.length; i++) {
			colourSwatches[i].style.display = "inline";
		}

		//show the colour picker
		document.getElementById("colour-picker").style = "display: colourP;";

		//show  brush size and its label
		brushSize.style.display = "inline";
		brushSizeLabel.style.display = "inline";

		//clear options
		select(".options").html("");

		select("#clearButton").elt.removeEventListener(
			"click",
			pictureToolClear
		);

		editMode = false;
		drawing = false;
		moving = false;
		self.draw();

		currentLayer.loadPixels();
		layers[layers.length - 1].loadPixels();

		selectedImage = null;
		cornerCircles = [];
		sideRectangles = [];

		deltaX = -1;
		deltaY = -1;
		startMouseX = -1;
		startMouseY = -1;
		shapeWidth = 1;
		shapeHeight = 1;
	};

	var self = this;
	this.populateOptions = function () {
		//hide the colour swatch
		for (let i = 0; i < colourSwatches.length; i++) {
			colourSwatches[i].style.display = "none";
		}

		//hide colour picker
		document.getElementById("colour-picker").style = "display: none;";

		//show  brush size and its label
		brushSize.style.display = "none";
		brushSizeLabel.style.display = "none";

		select(".options").html(
			"<button id='finishButton''>finish shape</button>"
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
			shapeWidth = 1;
			shapeHeight = 1;
		});

		select("#finishButton").elt.style.display = "none";

		//input file and use it as a stamp
		var input = createFileInput(handleFile);
		select(".options").child(input);

		select("#clearButton").elt.addEventListener("click", pictureToolClear);
	};

	this.refresh = function () {
		alert("choose image");

		editMode = false;
		drawing = false;
		moving = false;

		selectedImage = null;
		cornerCircles = [];
		sideRectangles = [];

		deltaX = -1;
		deltaY = -1;
		startMouseX = -1;
		startMouseY = -1;
		shapeWidth = 1;
		shapeHeight = 1;

		currentLayer.loadPixels();
	};

	var pictureToolClear = function () {
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
		shapeWidth = 1;
		shapeHeight = 1;

		self.draw();

		layers[currentLayerIndex].loadPixels();
	};

	//handles file
	var handleFile = function (file) {
		if (
			!(
				file.subtype === "png" ||
				file.subtype === "jpg" ||
				file.subtype === "jpeg"
			)
		) {
			alert(
				"file is not recognised image file, please select either png, jpg or jpeg format"
			);
			return;
		}

		selectedImage = loadImage(file.data);
	};
}
