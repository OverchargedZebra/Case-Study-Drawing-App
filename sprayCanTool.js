//spray can constructor function
function sprayCanTool() {
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	var points = 13;
	this.draw = function () {
		var spread = parseInt(document.getElementById("brush-size").value);
		spread *= 2;
		//if the mouse is pressed paint on the canvas
		//spread describes how far to spread the paint from the mouse pointer
		//points holds how many pixels of paint for each mouse press.
		push();
		strokeWeight(document.getElementById("brush-size").value / 4);
		if (mouseIsPressed) {
			for (var i = 0; i < points; i++) {
				point(
					random(mouseX - spread, mouseX + spread),
					random(mouseY - spread, mouseY + spread)
				);
			}
		}
		pop();
	};
}
