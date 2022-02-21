import React from "react";
import apple from "../apple.png";

function Navbar({ onShow }) {
	return (
		<div className="flex justify-between items-center p-5">
			<div className="flex items-center">
				<img src={apple} alt="apple pomodoro" className="w-6 md:w-8" />
				<h1 className="font-bold text-slate-800 md:text-2xl">
					POMOTIMER
				</h1>
			</div>
			<button
				onClick={() => onShow()}
				className="transition ease-in-out delay-50 bg-slate-200 rounded px-5 py-1 text-slate-600 hover:bg-slate-300"
			>
				Setting
			</button>
		</div>
	);
}

export default Navbar;
