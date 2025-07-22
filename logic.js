let imgFile = document.getElementById("upload");
let img = new Image();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pixelSlider = document.getElementById("pixelSlider");
let scaleSlider = document.getElementById("scaleSlider");

let scaleValue = document.getElementById("scaleValue");
let pixelValue = document.getElementById("pixelValue");

let originalWidth, originalHeight;

let displayFileName = document.getElementById("fileName");

// Function to draw the image on the canvas
const drawPixelImage = () => {
	if (!img.src || !img.complete) return;

	let scale = scaleSlider.value / 100;
	let pixelSize = pixelSlider.value;

	scaleValue.textContent = `${scaleSlider.value}%`;
	pixelValue.textContent = `${pixelSlider.value}%`;

	// 1. downscale the image to pixel size
	let tempCanvas = document.createElement("canvas");
	let tempCtx = tempCanvas.getContext("2d");

	tempCanvas.width = pixelSize;
	tempCanvas.height = pixelSize * (originalHeight / originalWidth);
	tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

	// 2. upscale the image to the canvas size
	let newWidth = originalWidth * scale;
	let newHeight = originalHeight * scale;
	canvas.width = newWidth;
	canvas.height = newHeight;

	ctx.imageSmoothingEnabled = false; // Disable smoothing for pixelated effect
	ctx.drawImage(tempCanvas, 0, 0, newWidth, newHeight);

	// Update resolution text
	const resolutionElement = document.getElementById("resolution");
	resolutionElement.textContent = `Resolution: ${newWidth.toFixed(
		0
	)}px × ${newHeight.toFixed(0)}px`;
};

// Set the file name when a file is uploaded
imgFile.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		if (file.name && file.name.length > 10) {
			displayFileName.textContent = file.name.substring(0, 10) + "...";
		} else {
			displayFileName.textContent = file.name;
		}
	}
});

// Load the image when a file is selected and draw it on the canvas
imgFile.addEventListener("change", (e) => {
	const file = e.target.files[0];
	img.src = URL.createObjectURL(file);
	img.onload = () => {
		originalWidth = img.width;
		originalHeight = img.height;
		drawPixelImage(); // Initial draw
	};
});

scaleSlider.addEventListener("input", drawPixelImage);
pixelSlider.addEventListener("input", drawPixelImage);

document.getElementById("resetBtn").addEventListener("click", () => {
	scaleSlider.value = 100; // Reset scale slider
	pixelSlider.value = 100; // Reset pixel slider
	scaleValue.textContent = "100%"; // Reset scale value display
	pixelValue.textContent = "100%"; // Reset pixel value display
	drawPixelImage(); // Redraw the image with default values
});

document.getElementById("saveBtn").addEventListener("click", () => {
	if (!img.src || !img.complete) {
		alert("Please upload an image first.");
		return;
	}
	const link = document.createElement("a");
	link.download = "pixelated_image.png";
	link.href = canvas.toDataURL("image/png");
	link.click(); // Trigger the download
});
