"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Define 5x7 pixel patterns for each character
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
const rowsCount = 7;

export default function HeroPixelArt() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [pixelSize, setPixelSize] = useState(2);
	const totalCols = word.length * 5 + (word.length - 1); // 5 pixels per letter & 1 space per gap

	useEffect(() => {
		// Function to update pixel size based on container width
		const updateSize = () => {
			if (!containerRef.current) return;
			const { width } = containerRef.current.getBoundingClientRect();
			const usableWidth = width * 0.4;
			const newSize = Math.floor(usableWidth / totalCols);
			setPixelSize(newSize > 4 ? newSize : 4);
		};
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, [totalCols]);
	// Calculate spacing based on pixel size, ensuring a minimum of 2px
	const spacing = Math.max(2, Math.floor(pixelSize * 0.25));

	return (
		<div
			ref={containerRef}
			className='relative w-full px-4 sm:px-8 flex justify-center items-center p-2 bg-gray-900'
		>
			<div>
				{Array.from({ length: rowsCount }).map((_, rowIndex) => (
					<div
						key={rowIndex}
						className='flex'
						style={{ marginBottom: spacing }}
					>
						{word.map((letter, letterIdx) => (
							<React.Fragment key={letterIdx}>
								{letterPatterns[
									letter as keyof typeof letterPatterns
								][rowIndex]
									.split("")
									.map((bit, bitIdx) =>
										bit === "1" ? (
											<motion.div
												key={`${letterIdx}-${bitIdx}`}
												style={{
													width: pixelSize,
													height: pixelSize,
													marginRight: spacing,
												}}
												className='bg-green-400'
												initial={{
													y: 0,
													opacity: 0,
												}}
												animate={{ y: 0, opacity: 1 }}
												transition={{
													delay: Math.random() * 1,
													duration: 0.4,
													ease: "easeOut",
													repeat: Infinity,
													repeatType: "loop",
													repeatDelay:
														4 + Math.random() * 5,
												}}
											/>
										) : (
											<div
												key={`${letterIdx}-${bitIdx}`}
												style={{
													width: pixelSize,
													height: pixelSize,
													marginRight: spacing,
												}}
											/>
										)
									)}
								{/* small gap after each letter */}
								<div style={{ width: spacing }} />
							</React.Fragment>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
