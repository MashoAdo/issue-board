import { useDroppable } from "@dnd-kit/core";
import type { TIssue } from "../../types";
import IssueCard from "./IssueCard";

interface IssueColumnProps {
	title: string;
	tasks: TIssue[];
	loading: boolean;
}

function IssueColumn({ title, tasks, loading }: IssueColumnProps) {
	const count = tasks.length;

	const { isOver, setNodeRef } = useDroppable({
		id: title.toLowerCase().replace(" ", ""), // Remove spaces for consistent IDs
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				flex: 1,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				minHeight: 0, // Important for flex children to shrink
				border: isOver ? "2px solid #3b82f6" : "1px solid lightgray",
				borderRadius: "8px",
				padding: "16px",
				backgroundColor: isOver ? "#f0f9ff" : "transparent",
				transition: "all 0.2s ease",
				position: "relative",
			}}
		>
			<div
				style={{
					display: "flex",
					border: "1px solid lightgray",
					borderRadius: "8px",
					padding: "4px 8px",
					marginBottom: "16px",
				}}
			>
				<p>{title}</p>
				<span style={{ marginLeft: "8px", color: "gray" }}>({loading ? "..." : count})</span>
			</div>

			{loading ? (
				<div style={{ padding: "16px" }}>Loading...</div>
			) : (
				<div
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						overflowY: "auto",
						scrollBehavior: "smooth",
						border: "1px solid ##FCFCFC",
						borderRadius: "8px",
						maxHeight: "700px",
					}}
				>
					{tasks.map((task) => (
						<IssueCard key={task.id} issue={task} />
					))}

					{count > 10 && (
						<button
							className="tasks-button tasks-button--primary"
							type="button"
							style={{ width: "fit-content", alignSelf: "center" }}
						>
							Load more
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default IssueColumn;
