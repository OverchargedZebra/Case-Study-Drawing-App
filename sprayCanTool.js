//spray can constructor function
function sprayCanTool() {
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	//modified this code to work better with my sliders
	var points = 13;
	this.draw = function (pg = currentLayer) {
		var spread = parseInt(document.getElementById("brush-size").value);
		spread *= 2;
		//if the mouse is pressed paint on the canvas
		//spread describes how far to spread the paint from the mouse pointer
		//points holds how many pixels of paint for each mouse press.
		pg.push();
		pg.strokeWeight(document.getElementById("brush-size").value / 4);
		if (mouseIsPressed) {
			for (var i = 0; i < points; i++) {
				pg.point(
					random(mouseX - spread, mouseX + spread),
					random(mouseY - spread, mouseY + spread)
				);
			}
		}
		pg.pop();
	};

	this.unselectTool = function () {
		currentLayer.loadPixels();
	};
}
