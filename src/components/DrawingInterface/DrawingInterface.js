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
			let x = 0;
			let y = 0;

			if (e.type === "touchmove" || e.type === "touchstart") {
				// For touch events
				x = e.touches[0].clientX;
				y = e.touches[0].clientY;
			} else {
				// For mouse events
				x = e.clientX;
				y = e.clientY;
			}

			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x, y);
		};

		// Add mouse event listeners
		canvas.addEventListener("mousedown", startDrawing);
		canvas.addEventListener("mouseup", stopDrawing);
		canvas.addEventListener("mouseout", stopDrawing);
		canvas.addEventListener("mousemove", draw);

		// Add touch event listeners
		canvas.addEventListener("touchstart", startDrawing);
		canvas.addEventListener("touchend", stopDrawing);
		canvas.addEventListener("touchmove", draw);

		return () => {
			// Cleanup for mouse events
			canvas.removeEventListener("mousedown", startDrawing);
			canvas.removeEventListener("mouseup", stopDrawing);
			canvas.removeEventListener("mouseout", stopDrawing);
			canvas.removeEventListener("mousemove", draw);

			// Cleanup for touch events
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
