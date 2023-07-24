function stampTool() {
	this.icon = "assets/stampTool.png";
	this.name = "stampTool";

	var stampImage = loadImage("assets/stampTool.png");

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
}
