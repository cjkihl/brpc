import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import { useState } from "react";
import { trpc } from "./trpc";

function App() {
	const [email, setEmail] = useState("foo.bar@gmail.com");
	const [password, setPassword] = useState("1234");
	return (
		<>
			<Toaster />
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
					onClick={async () => {
						const message = await trpc.ping.query();
						toast.success(message);
					}}
				>
					Ping
				</button>
				<button
					type="button"
					onClick={async () => {
						const message = await trpc.protected.query();
						toast.success(message);
					}}
				>
					Protected
				</button>
			</div>
			<div className="card">
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="button"
					onClick={async () => {
						const { success, message } = await trpc.auth.login.mutate({
							email,
							password,
						});

						toast[success ? "success" : "error"](message);
					}}
				>
					Login
				</button>
			</div>
		</>
	);
}

export default App;
