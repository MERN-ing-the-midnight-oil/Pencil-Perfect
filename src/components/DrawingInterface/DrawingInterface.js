import React, { useRef, useEffect } from "react";
import StrokeRecorder from "../StrokeRecorder/StrokeRecorder";

const DrawingInterface = () => {
	const canvasRef = useRef(null);
	let ctx;

	useEffect(() => {
		if (canvasRef.current) {
			ctx = canvasRef.current.getContext("2d");
		}
	}, [canvasRef.current]);

	const handleStrokeRecorded = (strokeData) => {
		// Handle the recorded stroke data here
		console.log("Hey the DrawingInterface has Recorded a Stroke:", strokeData);
		// Perform any necessary actions or pass the data to other components
	};

	return (
		<div>
			{/* Canvas element for drawing */}
			<canvas
				ref={canvasRef}
				style={{ border: "2px solid black" }}
			/>

			{/* StrokeRecorder component */}
			<StrokeRecorder
				canvasRef={canvasRef}
				onStrokeRecorded={handleStrokeRecorded}
			/>
		</div>
	);
};

export default DrawingInterface;
