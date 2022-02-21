import React from "react";

function InputTimer({ value, nameIn, name, onChange }) {
	return (
		<div>
			<label htmlFor={nameIn} className="capitalize">
				{name}
			</label>{" "}
			<br />
			<input
				type="number"
				min="1"
				value={value}
				name={nameIn}
				className=" w-1/2 bg-slate-200 my-2 rounded p-1"
				onChange={(e) => onChange(e, nameIn)}
			/>
			<hr />
		</div>
	);
}

export default InputTimer;
