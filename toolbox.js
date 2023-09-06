//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {
	var self = this;

	this.tools = [];
	this.selectedTool = null;

	var toolbarItemClick = function () {
		//remove any existing borders
		var items = selectAll(".sideBarItem");
		for (var i = 0; i < items.length; i++) {
			items[i].style("border", "0");
		}

		var toolName = this.id().split("sideBarItem")[0];
		self.selectTool(toolName);

		//call loadPixels to make sure most recent changes are saved to pixel array
		loadPixels();
	};

	//add a new tool icon to the html page
	var addToolIcon = function (icon, name) {
		var sideBarItem = createDiv(
			"<img draggable='false' src='" + icon + "'></div>"
		);
		sideBarItem.class("sideBarItem");
		sideBarItem.id(name + "sideBarItem");
		sideBarItem.parent("sidebar");
		sideBarItem.mouseClicked(toolbarItemClick);
	};

	//add a tool to the tools array
	this.addTool = function (tool) {
		//check that the object tool has an icon and a name
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
			alert("make sure your tool has both a name and an icon");
		}
		this.tools.push(tool);
		addToolIcon(tool.icon, tool.name);
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool == null) {
			this.selectTool(tool.name);
		}
	};

	this.selectTool = function (toolName) {
		//search through the tools for one that's name matches
		//toolName
		var brushSize = document.getElementById("brush-size");
		var brushSizeLabel = document.getElementById("brush-size-label");

		var stampSpreadSize = document.getElementById("stamp-spread-size");
		var stampSpreadSizeLabel = document.getElementById(
			"stamp-spread-size-label"
		);

		for (var i = 0; i < this.tools.length; i++) {
			if (this.tools[i].name == toolName) {
				//if the tool has an unselectTool method run it.
				if (
					this.selectedTool != null &&
					this.selectedTool.hasOwnProperty("unselectTool")
				) {
					this.selectedTool.unselectTool();
				}
				//select the tool and highlight it on the toolbar
				this.selectedTool = this.tools[i];
				select("#" + toolName + "sideBarItem").style(
					"border",
					"2px solid blue"
				);

				//if the tool has an options area. Populate it now.
				if (this.selectedTool.hasOwnProperty("populateOptions")) {
					this.selectedTool.populateOptions();
				}

				if (this.tools[i].name == "stampTool") {
					brushSize.max = 100;
					brushSize.value = 50;
					brushSizeLabel.innerHTML =
						"Brush size = " + brushSize.value;

					stampSpreadSize.style.display = "inline";
					stampSpreadSizeLabel.style.display = "inline";
				} else {
					if (brushSize.value > 20) brushSize.value = 10;
					brushSize.max = 20;
					brushSizeLabel.innerHTML =
						"Brush size = " + brushSize.value;

					stampSpreadSize.style.display = "none";
					stampSpreadSizeLabel.style.display = "none";
				}
			}
		}
	};
}
