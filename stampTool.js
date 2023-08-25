function stampTool() {
	this.icon = "assets/stampTool.png";
	this.name = "stampTool";

	var stamps = [
		"assets/stampTool.png",
		"assets/stampImage2.png",
		"assets/stampImage3.png",
		"assets/stampImage4.png",
		"assets/stampImage5.png",
		"assets/stampImage6.png",
		"assets/stampImage7.png",
		"assets/stampImage8.png",
	];

	for (var i = 0; i < stamps.length; i++) {
		stamps[i] = loadImage(stamps[i]);
	}

	var stampImage = stamps[0];

	var number = 1;

	this.draw = function () {
		var size = parseInt(document.getElementById("brush-size").value);
		var spread = parseInt(
			document.getElementById("stamp-spread-size").value
		);

		if (mouseIsPressed) {
			for (var i = 0; i < number; i++) {
				image(
					stampImage,
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
		}
	};

	var originalSwatchStyle = [];
	var colourSwatches = document.getElementsByClassName("colourSwatches");

	this.unselectTool = function () {
		loadPixels();

		for (let i = 0; i < colourSwatches.length; i++) {
			colourSwatches[i].style = originalSwatchStyle[i];
		}

		colourP.loadColours();

		document.getElementById("colour-picker").style = "display: colourP;";

		select(".options").html("");
	};

	this.populateOptions = function () {
		for (let i = 0; i < colourSwatches.length; i++) {
			originalSwatchStyle.push(colourSwatches[i].style);
			colourSwatches[i].style = "display: none;";
		}

		document.getElementById("colour-picker").style = "display: none;";
	};
}
