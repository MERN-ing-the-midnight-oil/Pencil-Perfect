import React, { useRef, useEffect, useState } from "react";

// Initial styles can be placed in the CSS module
import styles from "./DrawingInterface.module.css";

const DrawingInterface = () => {
	const [isRecording, setIsRecording] = useState(false); // State to track if we are currently recording
	const [strokes, setStrokes] = useState([]); // State to store the recorded strokes
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
		//draw function first checks if drawing is true (the pen is down). Then, it determines whether the event is a touch event or a mouse event based on the event's type and gets the coordinates accordingly. It uses these coordinates to draw a line from the previous location to the new location,
		const draw = (e) => {
			if (!drawing) return; // Don't do anything if we're not currently drawing
			let x = 0;
			let y = 0;
			// Distinguish between mouse and touch events
			if (e.type === "touchmove" || e.type === "touchstart") {
				// For touch events
				x = e.touches[0].clientX;
				y = e.touches[0].clientY;
			} else {
				// For mouse events
				x = e.clientX;
				y = e.clientY;
			}

			ctx.lineTo(x, y); // Draw line to new point
			ctx.stroke(); // Render the line
			ctx.beginPath(); // Start new path
			ctx.moveTo(x, y); // Move pen to new location

			// If currently recording, add this stroke to the strokes array
			if (isRecording) {
				setStrokes((oldStrokes) => [...oldStrokes, { x, y }]);
			}
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
			{/* Button to start/stop recording. Clicking it toggles isRecording and the label reflects current recording status */}
			<button onClick={() => setIsRecording(!isRecording)}>
				{isRecording ? "Stop Recording" : "Start Recording"}
			</button>
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
