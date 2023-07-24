function erasingTool() {
	this.icon = "assets/erasingTool.png";
	this.name = "erasingTool";

	this.draw = function () {
		var size = parseInt(document.getElementById("brush-size").value);
		size *= 2;

		push();
		if (mouseIsPressed) {
			fill(255);
			stroke(255);
			rect(mouseX - size / 2, mouseY - size / 2, size, size);
		}
		pop();
	};
}
