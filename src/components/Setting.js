import React from "react";
import TimerSetting from "./TimerSetting";
import InputTimer from "./InputTimer";
import IntervalTimer from "./IntervalTimer";

function Setting({ onDisappear, data, onhandleChange }) {
	return (
		<div>
			<div
				onClick={() => onDisappear()}
				className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 z-2"
			></div>
			<div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded z-20 w-full md:w-1/2">
				<TimerSetting>
					<InputTimer
						value={data.pomodoro}
						nameIn="pomodoro"
						name="pomodoro"
						onChange={onhandleChange}
					/>
					<InputTimer
						value={data.shortBreak}
						nameIn="shortBreak"
						name="short break"
						onChange={onhandleChange}
					/>
					<InputTimer
						value={data.longBreak}
						nameIn="longBreak"
						name="long break"
						onChange={onhandleChange}
					/>
				</TimerSetting>
				<IntervalTimer
					value={data.longBreakInterval}
					nameIn="longBreakInterval"
					onChange={onhandleChange}
				/>
			</div>
		</div>
	);
}

export default Setting;
