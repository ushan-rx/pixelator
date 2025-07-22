document.addEventListener("DOMContentLoaded", () => {
	// 5x7 pixel patterns for "PIXELATOR"
	const letterPatterns = {
		P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
		I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
		X: ["10001", "01010", "00100", "00100", "00100", "01010", "10001"],
		E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
		L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
		A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
		T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
		O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
		R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
	};
	const word = "PIXELATOR".split("");
	const rows = 7;
	const container = document.getElementById("heroPixelArt");
	const wrapper = document.getElementById("heroPixelArtWrapper");

	function renderHero() {
		const { width } = wrapper.getBoundingClientRect();
		const totalCols = word.length * 5 + (word.length - 1);
		// leave 10% padding so it never hits edges
		const usable = width * 0.9;
		const pixelSize = Math.max(4, Math.floor(usable / totalCols));
		const spacing = Math.max(2, Math.floor(pixelSize * 0.25));

		container.innerHTML = ""; // clear old

		for (let r = 0; r < rows; r++) {
			const rowDiv = document.createElement("div");
			rowDiv.className = "pixel-row";
			rowDiv.style.marginBottom = spacing + "px";

			word.forEach((letter, li) => {
				letterPatterns[letter][r].split("").forEach((bit, bi) => {
					const cell = document.createElement(
						bit === "1" ? "div" : "div"
					);
					cell.style.width = pixelSize + "px";
					cell.style.height = pixelSize + "px";
					cell.style.marginRight = spacing + "px";
					if (bit === "1") {
						cell.className = "pixel";
						// randomize blink timing
						const dly = (Math.random() * 2).toFixed(2) + "s";
						const dur =
							(0.8 + Math.random() * 0.6).toFixed(2) + "s";
						cell.style.animationDelay = dly;
						cell.style.animationDuration = dur;
					}
					rowDiv.appendChild(cell);
				});
				// small gap after each letter
				const gap = document.createElement("div");
				gap.style.width = spacing + "px";
				rowDiv.appendChild(gap);
			});

			container.appendChild(rowDiv);
		}
	}

	// initial + on resize
	renderHero();
	window.addEventListener("resize", renderHero);
});
