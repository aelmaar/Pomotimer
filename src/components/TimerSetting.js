import React from "react";

function TimerSetting(props) {
	return (
		<div>
			<h2 className="font-bold">Time (minutes)</h2>
			<div className="flex justify-between">{props.children}</div>
		</div>
	);
}

export default TimerSetting;
