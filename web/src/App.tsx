import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useState } from "react";
import { trpc } from "./trpc";

function App() {
	const [text, setText] = useState("");
	return (
		<>
			<div>
				<a href="https://vite.dev">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button
					type="button"
					onClick={() => {
						trpc.ping.query().then(setText);
					}}
				>
					Ping
				</button>
				<p>{text}</p>
			</div>
		</>
	);
}

export default App;
