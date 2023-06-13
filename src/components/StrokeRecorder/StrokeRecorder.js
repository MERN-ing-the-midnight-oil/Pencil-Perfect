import React, { useRef, useEffect } from "react";

const StrokeRecorder = ({ canvasRef, onStrokeRecorded }) => {
	const ctx = useRef(null);
	const currentStroke = useRef([]);

	useEffect(() => {
		if (canvasRef.current) {
			ctx.current = canvasRef.current.getContext("2d");
			console.log("Canvas initialized");
		}
	}, [canvasRef]);

	const handleStrokeStart = (event) => {
		const { offsetX, offsetY } = getMousePosition(event);
		currentStroke.current = [{ x: offsetX, y: offsetY }];
		console.log("Stroke start:", currentStroke.current);
		canvasRef.current.addEventListener("mousemove", handleStrokeMove);
		canvasRef.current.addEventListener("mouseup", handleStrokeEnd);
	};

	const handleStrokeMove = (event) => {
		const { offsetX, offsetY } = getMousePosition(event);
		currentStroke.current.push({ x: offsetX, y: offsetY });
		console.log("Stroke move:", currentStroke.current);
		renderStroke();
	};

	const handleStrokeEnd = () => {
		canvasRef.current.removeEventListener("mousemove", handleStrokeMove);
		canvasRef.current.removeEventListener("mouseup", handleStrokeEnd);
		console.log("Stroke end:", currentStroke.current);
		saveStroke(currentStroke.current);
		onStrokeRecorded(currentStroke.current);
	};

	const renderStroke = () => {
		const canvas = canvasRef.current;
		const context = ctx.current;
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
		currentStroke.current.forEach((point, index) => {
			if (index === 0) {
				context.moveTo(point.x, point.y);
			} else {
				context.lineTo(point.x, point.y);
			}
		});
		context.stroke();
		console.log("Stroke rendered");
	};

	const saveStroke = (stroke) => {
		const storedStrokes = JSON.parse(localStorage.getItem("strokes")) || [];
		storedStrokes.push(stroke);
		localStorage.setItem("strokes", JSON.stringify(storedStrokes));
		console.log("Strokes saved:", storedStrokes);
	};

	const getMousePosition = (event) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;
		return { offsetX, offsetY };
	};

	return null; // Return null instead of a canvas element
};

export default StrokeRecorder;
