import React from "react";
import ButtonChange from "./ButtonChange";
import { format } from "../utility/format.js";

function Pomodoro({
	timer,
	handleClickChange,
	handleClick,
	seconds,
	isStarted,
	realTimer,
}) {
	return (
		<div className="text-center py-3 rounded border-solid border border-slate-200 bg-slate-100 shadow-2xl">
			<div>
				<ButtonChange
					name="pomodoro"
					onClick={handleClickChange}
					nameCh="pomodoro"
					Active={realTimer}
				/>
				<ButtonChange
					name="short break"
					onClick={handleClickChange}
					nameCh="shortBreak"
					Active={realTimer}
				/>
				<ButtonChange
					name="long break"
					onClick={handleClickChange}
					nameCh="longBreak"
					Active={realTimer}
				/>
			</div>
			<h1 className="text-slate-700 font-bold text-6xl my-10 md:text-8xl">
				{`${format(timer)}:${format(seconds)}`}
			</h1>
			<div className="inline-block bg-slate-400 rounded">
				<button
					onClick={handleClick}
					className={`bg-slate-600 px-6 py-2 rounded font-bold text-2xl text-white uppercase transition ease-in-out delay-50 ${
						!isStarted && "-translate-y-1.5"
					} md:px-10 md:py-4 md:text-4xl`}
				>
					{isStarted ? "stop" : "start"}
				</button>
			</div>
		</div>
	);
}

export default Pomodoro;
