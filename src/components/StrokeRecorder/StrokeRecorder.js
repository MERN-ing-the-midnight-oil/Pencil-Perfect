import React, { useRef } from "react";

const StrokeRecorder = ({ onStrokeRecorded }) => {
	const canvasRef = useRef(null);
	let ctx;
	let currentStroke = [];

	const handleStrokeStart = (event) => {
		// Start a new stroke by clearing the previous stroke coordinates
		currentStroke = [];
		// Capture the initial position of the stroke
		const { offsetX, offsetY } = getMousePosition(event);
		currentStroke.push({ x: offsetX, y: offsetY });
		// Attach event listeners for stroke movement and end
		canvasRef.current.addEventListener("mousemove", handleStrokeMove);
		canvasRef.current.addEventListener("mouseup", handleStrokeEnd);
	};

	const handleStrokeMove = (event) => {
		// Capture the position of the stroke during movement
		const { offsetX, offsetY } = getMousePosition(event);
		currentStroke.push({ x: offsetX, y: offsetY });
		// Render the stroke on the canvas
		renderStroke();
	};

	const handleStrokeEnd = () => {
		// Remove event listeners for stroke movement and end
		canvasRef.current.removeEventListener("mousemove", handleStrokeMove);
		canvasRef.current.removeEventListener("mouseup", handleStrokeEnd);
		// Pass the recorded stroke data to the onStrokeRecorded callback
		onStrokeRecorded(currentStroke);
	};

	const renderStroke = () => {
		// Clear the canvas
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		// Render each line segment of the stroke
		ctx.beginPath();
		currentStroke.forEach((point, index) => {
			if (index === 0) {
				ctx.moveTo(point.x, point.y);
			} else {
				ctx.lineTo(point.x, point.y);
			}
		});
		ctx.stroke();
	};

	const getMousePosition = (event) => {
		// Calculate the mouse position relative to the canvas
		const rect = canvasRef.current.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;
		return { offsetX, offsetY };
	};

	return (
		<div>
			{/* Canvas element for stroke recording */}
			<canvas
				ref={canvasRef} // Attach the canvas ref to the canvas element
				onMouseDown={handleStrokeStart} // Start recording stroke on mouse down
			/>
		</div>
	);
};

export default StrokeRecorder;
