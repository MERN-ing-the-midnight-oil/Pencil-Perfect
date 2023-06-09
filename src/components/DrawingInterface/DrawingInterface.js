import React, { useRef, useEffect } from "react";
import StrokeRecorder from "../StrokeRecorder/StrokeRecorder";

const DrawingInterface = () => {
	const canvasRef = useRef(null);
	let ctx;

	useEffect(() => {
		// Get the 2D rendering context for the canvas
		ctx = canvasRef.current.getContext("2d");
	}, []);

	const handleStrokeRecorded = (strokeData) => {
		// Handle the recorded stroke data here
		console.log("Recorded Stroke:", strokeData);
		// Perform any necessary actions or pass the data to other components
	};

	return (
		<div>
			{/* Canvas element for drawing */}
			<canvas
				ref={canvasRef} // Attach the canvas ref to the canvas element
				style={{ border: "2px solid black" }} // Inline style for the canvas
			/>

			{/* StrokeRecorder component */}
			<StrokeRecorder onStrokeRecorded={handleStrokeRecorded} />
		</div>
	);
};

export default DrawingInterface;
