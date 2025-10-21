import { useDroppable } from "@dnd-kit/core";
import type { IssueStatus, TIssue } from "../../types";
import IssueCard from "./IssueCard";
import IssueDraggable from "./IssueDraggable";

interface IssueColumnProps {
	title: string;
	tasks: TIssue[];
	loading: boolean;
	columnStatus: IssueStatus;
}

function IssueColumn({ title, tasks, loading, columnStatus }: IssueColumnProps) {
	const count = tasks.length;

	const { isOver, setNodeRef } = useDroppable({
		id: columnStatus,
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				flex: 1,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				minHeight: 0,
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
						<IssueDraggable key={task.id} issue={task}>
							<IssueCard
								issue={task}
								stylesOverride={{
									border: "1px solid lightgray",
									borderRadius: "8px",
									padding: "12px 8px",
									backgroundColor: "white",
								}}
							/>
						</IssueDraggable>
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
