function erasingTool() {
	this.icon = "assets/erasingTool.png";
	this.name = "erasingTool";

	this.draw = function () {
		var size = parseInt(document.getElementById("brush-size").value);
		size *= 2;
		updatePixels();

		push();
		if (mouseIsPressed) {
			fill(255);
			stroke(255);
			rect(mouseX - size / 2, mouseY - size / 2, size, size);
		}
		pop();

		loadPixels();

		push();
		noFill();
		strokeWeight(1);
		stroke(0);
		rect(mouseX - size / 2, mouseY - size / 2, size, size);
		pop();
	};

	this.unselectTool = function () {
		updatePixels();
	};
}
