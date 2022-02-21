import React from "react";

function IntervalTimer({ value, nameIn, onChange }) {
	return (
		<div className="flex justify-between items-center my-2">
			<h2 className="font-bold">Long Break Interval</h2>
			<input
				type="number"
				value={value}
				name={nameIn}
				className="bg-slate-200 rounded w-20 p-1"
				onChange={(e) => onChange(e, nameIn)}
			/>
		</div>
	);
}

export default IntervalTimer;
