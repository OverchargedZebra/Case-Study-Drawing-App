function erasingTool() {
	this.icon = "assets/erasingTool.png";
	this.name = "erasingTool";

	var shapeButton;
	var shapeMode = true;

	this.draw = function (pg = currentLayer, tpg = layers[layers.length - 1]) {
		var size = parseInt(document.getElementById("brush-size").value);
		size *= 2;
		tpg.updatePixels();

		if (mouseIsPressed) {
			SetNull(pg, mouseX, mouseY, size);
			pg.loadPixels();
		}

		tpg.loadPixels();

		tpg.push();
		tpg.noFill();
		tpg.strokeWeight(1);
		tpg.stroke(0);
		if (shapeMode) {
			tpg.rect(mouseX - size / 2, mouseY - size / 2, size, size);
		} else {
			tpg.ellipse(mouseX, mouseY, size, size);
		}
		tpg.pop();
	};

	var SetNull = function (pg, x, y, size) {
		var c = color("rgba(0, 0, 0, 0)");
		if (shapeMode) {
			for (var i = x - size / 2; i <= x + size / 2; i++) {
				for (var j = y - size / 2; j <= y + size / 2; j++) {
					pg.set(i, j, c);
				}
			}
		} else {
			for (var i = x - size / 2; i <= x + size / 2; i++) {
				for (var j = y - size / 2; j <= y + size / 2; j++) {
					if (dist(x, y, i, j) < size / 2) pg.set(i, j, c);
				}
			}
		}

		pg.updatePixels();
	};

	this.unselectTool = function () {
		layers[layers.length - 1].updatePixels();

		select(".options").html("");
	};

	this.populateOptions = function () {
		select(".options").html(
			"<button id='shapeButton'>circular eraser</button>"
		);

		shapeButton = select("#shapeButton");
		shapeButton.mouseClicked(function () {
			shapeMode = !shapeMode;
			if (shapeMode) {
				shapeButton.html("circular eraser");
			} else {
				shapeButton.html("rect eraser");
			}
		});
	};
}
