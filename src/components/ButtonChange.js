import React from "react";

function ButtonChange({ name, onClick, nameCh, Active }) {
	return (
		<div
			className={`p-1 rounded-full ${
				Active === nameCh && "bg-slate-500"
			} inline-block`}
		>
			<button
				onClick={() => onClick(nameCh)}
				className="bg-slate-200 rounded-full text-sm px-3 py-1 text-slate-600 capitalize font-bold md:px-5 md:text-base"
			>
				{name}
			</button>
		</div>
	);
}

export default ButtonChange;
