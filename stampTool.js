function stampTool() {
	this.icon = "assets/stampTool.png";
	this.name = "stampTool";

	//loading different stamps to be used
	var stampNames = [
		"stampTool",
		"stampImage2",
		"stampImage3",
		"stampImage4",
		"stampImage5",
		"stampImage6",
		"stampImage7",
		"stampImage8",
	];

	var stampImages = [];

	for (var i = 0; i < stampNames.length; i++) {
		stampImages.push(loadImage("assets/" + stampNames[i] + ".png"));
	}

	var selectedIndex = 0;
	var selectedImage = stampImages[selectedIndex];

	this.draw = function () {
		var size = parseInt(document.getElementById("brush-size").value);
		var spread = parseInt(
			document.getElementById("stamp-spread-size").value
		);

		if (mouseIsPressed) {
			image(
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

	var stampClicked = function () {
		//remove the old border
		var current = document.getElementById(stampNames[selectedIndex]);

		current.style = "border: 0;";

		//choose clicked stamp
		if ("index" in this.dataset) selectedIndex = this.dataset.index;
		selectedImage = stampImages[selectedIndex];

		//add a new border to the selected colour
		this.style = "border: 2px solid blue;";
	};

	var originalSwatchStyle = [];
	var colourSwatches = document.getElementsByClassName("colourSwatches");

	this.unselectTool = function () {
		loadPixels();

		//return colour swatches to original style
		for (let i = 0; i < colourSwatches.length; i++) {
			colourSwatches[i].style = originalSwatchStyle[i];
		}

		//reload the colours
		colourP.loadColours();

		//show the colour picker
		document.getElementById("colour-picker").style = "display: colourP;";

		select(".options").html("");
	};

	this.populateOptions = function () {
		//hide the colour swatch
		for (let i = 0; i < colourSwatches.length; i++) {
			originalSwatchStyle.push(colourSwatches[i].style);
			colourSwatches[i].style = "display: none;";
		}

		//hide colour picker
		document.getElementById("colour-picker").style = "display: none;";

		//show stamp images in option
		var stampsHtml = "";
		for (i = 0; i < stampNames.length; i++) {
			stampsHtml +=
				"<img src='assets/" +
				stampNames[i] +
				".png' alt='" +
				stampNames[i] +
				"' width='50' height='50' id='" +
				stampNames[i] +
				"' data-index='" +
				i +
				"' style='" +
				"display: inline" +
				";'>";
		}

		select(".options").html(
			"<div style='margin:15px;'>" + stampsHtml + "</div>"
		);

		//adding the function stampClicked to mouseup event of htm;l element
		for (i = 0; i < stampNames.length; i++) {
			var stamp = document.getElementById(stampNames[i]);
			if (stamp) {
				stamp.addEventListener("mouseup", stampClicked);
			}
		}
	};
}
