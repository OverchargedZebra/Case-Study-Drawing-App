function stampTool() {
	this.icon = "assets/stampTool.png";
	this.name = "stampTool";

	//loading different stamps to be used
	var stampNames = [
		"assets/stampTool.png",
		"assets/stampImage2.png",
		"assets/stampImage3.png",
		"assets/stampImage4.png",
		"assets/stampImage5.png",
		"assets/stampImage6.png",
		"assets/stampImage7.png",
		"assets/stampImage8.png",
	];

	var stamphtmlElements = [];
	var stampImages = [];

	var selectedIndex = 0;
	var selectedImage = stampImages[selectedIndex];

	this.draw = function (pg = currentLayer) {
		var size = parseInt(document.getElementById("brush-size").value);
		var spread = parseInt(
			document.getElementById("stamp-spread-size").value
		);

		if (mouseIsPressed) {
			pg.image(
				selectedImage,
				random(
					mouseX - size / 2 - spread * 5,
					mouseX - size / 2 + spread * 5
				),
				random(
					mouseY - size / 2 - spread * 5,
					mouseY - size / 2 + spread * 5
				),
				size,
				size
			);
		}
	};

	var loadStamps = function () {
		var stampsHtml = createDiv();
		stampsHtml.id("stamps");
		select(".options").child(stampsHtml);

		for (var i = 0; i < stampNames.length; i++) {
			addStamp(stampNames[i]);
		}

		selectedImage = stampImages[selectedIndex];
		stamphtmlElements[selectedIndex].elt.style.border = "2px solid blue";
	};

	var addStamp = function (stamp, index = stampImages.length) {
		var newStamp = createImg(stamp, stamp);
		newStamp.id(stamp);
		newStamp.mouseClicked(stampClicked);
		newStamp.elt.style.width = "50px";
		newStamp.elt.style.height = "50px";
		newStamp.elt.dataset.index = index;
		newStamp.elt.setAttribute("draggable", false);
		select("#stamps").child(newStamp);

		stampImages.push(loadImage(stamp));
		stamphtmlElements.push(newStamp);
	};

	var stampClicked = function () {
		//remove the old border
		var current = stamphtmlElements[selectedIndex];

		current.elt.style.border = "0px";

		//choose clicked stamp
		if ("index" in this.elt.dataset) selectedIndex = this.elt.dataset.index;
		selectedImage = stampImages[selectedIndex];

		//add a new border to the selected colour
		this.elt.style.border = "2px solid blue";
	};

	//used to hide colour swatches
	var colourSwatches = document.getElementsByClassName("colourSwatches");

	//used to increase value of brush size
	var brushSize = document.getElementById("brush-size");
	var brushSizeLabel = document.getElementById("brush-size-label");

	//used to show/hide these elements
	var stampSpreadSize = document.getElementById("stamp-spread-size");
	var stampSpreadSizeLabel = document.getElementById(
		"stamp-spread-size-label"
	);

	this.unselectTool = function () {
		currentLayer.loadPixels();

		//return colour swatches to original style
		for (let i = 0; i < colourSwatches.length; i++) {
			colourSwatches[i].style.display = "inline";
		}

		//show the colour picker
		document.getElementById("colour-picker").style = "display: colourP;";

		if (brushSize.value > 20) brushSize.value = 10;
		brushSize.max = 20;
		brushSizeLabel.innerHTML = "Brush size = " + brushSize.value;

		stampSpreadSize.style.display = "none";
		stampSpreadSizeLabel.style.display = "none";

		select(".options").html("");
	};

	this.populateOptions = function () {
		//hide the colour swatch
		for (let i = 0; i < colourSwatches.length; i++) {
			colourSwatches[i].style.display = "none";
		}

		//hide colour picker
		document.getElementById("colour-picker").style = "display: none;";

		brushSize.max = 100;
		brushSize.value = 50;
		brushSizeLabel.innerHTML = "Brush size = " + brushSize.value;

		stampSpreadSize.style.display = "inline";
		stampSpreadSizeLabel.style.display = "inline";

		//input file and use it as a stamp
		var input = createFileInput(handleFile);
		select(".options").child(input);

		//show stamp images in option
		loadStamps();
	};

	//used to refresh the values forcefully to default
	this.refresh = function () {
		selectedIndex = 0;
		selectedImage = stampImages[selectedIndex];
		stamphtmlElements[selectedIndex].elt.style.border = "2px solid blue";
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

		addStamp(file.data);
	};
}
