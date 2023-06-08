// StrokeRecorder.js

// Import the useState hook from React.
// This allows us to have state within functional components.
import { useState } from "react";

// We define a custom hook named "useStrokeRecorder".
// This hook handles all the stroke recording logic.
export default function useStrokeRecorder() {
	// isRecording: a boolean indicating whether we're currently recording strokes.
	// setIsRecording: a function to change isRecording.
	const [isRecording, setIsRecording] = useState(false);

	// strokes: an array of all recorded strokes. Each stroke is itself an array of points.
	// setStrokes: a function to change strokes.
	const [strokes, setStrokes] = useState([]);

	// currentStroke: an array of points for the currently in-progress stroke.
	// setCurrentStroke: a function to change currentStroke.
	const [currentStroke, setCurrentStroke] = useState([]);

	// This function starts the recording process.
	const startRecording = () => {
		setIsRecording(true);
		setCurrentStroke([]);
	};

	// This function stops the recording process, and saves the current stroke to the list of strokes.
	const stopRecording = () => {
		setIsRecording(false);
		setStrokes([...strokes, currentStroke]);
	};

	// This function records a single point to the current stroke.
	const recordStroke = (x, y) => {
		if (!isRecording) return;
		setCurrentStroke([...currentStroke, { x, y }]);
	};

	// Our custom hook returns an object with all the state variables and functions that can be used by other components.
	return {
		isRecording,
		strokes,
		startRecording,
		stopRecording,
		recordStroke,
	};
}
