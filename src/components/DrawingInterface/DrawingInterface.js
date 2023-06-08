import React, { useRef, useEffect } from "react";

// Initial styles can be placed in the CSS module
import styles from "./DrawingInterface.module.css";

const DrawingInterface = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d"); // Get the 2D context for the canvas

		// Set canvas width and height to the size of its parent container
		canvas.width = canvas.parentElement.offsetWidth;
		canvas.height = canvas.parentElement.offsetHeight;

		// Set some initial properties for the canvas
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;

		// Set up touch events
		let drawing = false;

		const startDrawing = (e) => {
			drawing = true;
			draw(e);
		};

		const stopDrawing = () => {
			drawing = false;
			ctx.beginPath(); // Start a new path for the next time the user starts drawing
		};

		const draw = (e) => {
			if (!drawing) return;
			ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY); // Draw a line to the new location
			ctx.stroke(); // Render the line
			ctx.beginPath(); // Start a new path
			ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY); // Move the pen to the new location
		};

		canvas.addEventListener("touchstart", startDrawing);
		canvas.addEventListener("touchend", stopDrawing);
		canvas.addEventListener("touchmove", draw);

		return () => {
			// Cleanup when component unmounts
			canvas.removeEventListener("touchstart", startDrawing);
			canvas.removeEventListener("touchend", stopDrawing);
			canvas.removeEventListener("touchmove", draw);
		};
	}, []);

	return (
		<div className={styles.drawingInterface}>
			{/* We set the width and height directly on the canvas element for a sharp, clear canvas */}
			<canvas
				ref={canvasRef}
				width={window.innerWidth}
				height={window.innerHeight}
			/>
		</div>
	);
};

export default DrawingInterface;
