import React from "react";
import styles from "./App.module.css";
import DrawingInterface from "./components/DrawingInterface/DrawingInterface";

function App() {
	return (
		<div className={styles.App}>
			<DrawingInterface />
		</div>
	);
}

export default App;
