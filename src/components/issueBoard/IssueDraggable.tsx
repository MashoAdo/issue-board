import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import type { TIssue } from "../../types";

interface IssueDraggableProps {
	issue: TIssue;
	children: React.ReactNode;
}

function IssueDraggable({ issue, children }: IssueDraggableProps) {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: issue.id.toString(),
		data: {
			//This is used to determine which column the issue is dropped from
			columnStatus: issue.status,
		},
	});

	const [isHovering, setIsHovering] = useState(false);

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			style={{ position: "relative" }}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{children}
			{/* Dedicated drag handle - only this area triggers drag */}
			{isHovering && (
				<div
					{...listeners}
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						right: "50%",
						width: "20px",
						height: "20px",
						cursor: "grab",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "rgba(0, 0, 0, 0.1)",
						borderRadius: "4px",
						opacity: 0.6,
						transition: "opacity 0.2s ease",
						zIndex: 10,
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.opacity = "1";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.opacity = "0.6";
					}}
					title="Drag to move issue"
				>
					<svg width="20" height="20" viewBox="0 0 0.4 0.4" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.178 0.307 0.2 0.33 0.222 0.307a0.025 0.025 0 0 1 0.035 0.035L0.2 0.4 0.142 0.343A0.025 0.025 0 0 1 0.178 0.307M0.093 0.142A0.025 0.025 0 0 1 0.095 0.175L0.093 0.178 0.07 0.2l0.022 0.022a0.025 0.025 0 0 1 -0.033 0.037L0.057 0.258 0 0.2 0.058 0.142a0.025 0.025 0 0 1 0.035 0m0.249 0L0.4 0.2 0.343 0.258A0.025 0.025 0 0 1 0.307 0.222L0.33 0.2 0.307 0.178a0.025 0.025 0 1 1 0.035 -0.035M0.2 0.15a0.025 0.025 0 0 1 0.025 0.025 0.025 0.025 0 1 1 0 0.05 0.025 0.025 0 1 1 -0.05 0 0.025 0.025 0 1 1 0 -0.05A0.025 0.025 0 0 1 0.2 0.15m0 -0.15 0.058 0.058a0.025 0.025 0 1 1 -0.035 0.035L0.2 0.07 0.178 0.092a0.025 0.025 0 0 1 -0.035 -0.035z" />
					</svg>
				</div>
			)}
		</div>
	);
}

export default IssueDraggable;
