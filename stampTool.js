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

	var selectedImage = stampImages[0];

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
				" style='" +
				"display: inline" +
				";'>";
		}

		select(".options").html(
			"<div style='margin:15px;'>" + stampsHtml + "</div>"
		);
	};
}
